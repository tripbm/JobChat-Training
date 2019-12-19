import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session';
import redis from 'redis';
import { ApolloServer, PubSub } from 'apollo-server-express';
import typeDefs from './src/api/graphql/schema';
import resolvers from './src/api/graphql/resolvers';
const pubsub = new PubSub();
import UserRepo from './src/api/graphql/datasources/UserRepo';
import MessageRepo from './src/api/graphql/datasources/MessageRepo';
import GroupChatRepo from './src/api/graphql/datasources/GroupChatRepo';
import { secretSession, server, redisServer } from './src/config/index';
const redisStore = require('connect-redis')(expressSession);
const client = redis.createClient();
const app = express();
const port = server.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  expressSession({
    secret: secretSession,
    store: new redisStore({
      host: redisServer.host,
      port: redisServer.host,
      client: client,
      ttl: redisServer.ttl,
    }),
    resave: false,
    cookie: { secure: false, maxAge: 86400000 },
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

require('./src/utils/authenGrantPassport');

app.post('/login', function(req, res, next) {
  passport.authenticate('local', { session: true }, function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
});

const serverGraphql = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
    formatError: error => {
      return error;
    },
  },
  context: async ({ req, res, connection }) => {
    if (connection) return { connection, pubsub };
    let auth = null;
    if (req) auth = req.user;
    return {
      pubsub,
      auth,
      user: new UserRepo(),
      message: new MessageRepo(),
      groupChat: new GroupChatRepo(),
    };
  },
});

serverGraphql.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
serverGraphql.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  require('./src/database/db');
  console.log(`app is listening to port ${port}`);
});
