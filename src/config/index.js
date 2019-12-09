const path = require('path');
require('dotenv').config({ path: path.join(__dirname,'.env')});

module.exports = {
    server: {
        evironment: process.env.evironment,
        port: process.env.port_server || 4000
    },
    database: {
        uri: process.env.mongoose_url,
        database_name: process.env.database_name
    },
    secret: process.env.secret || 'secret',
    saltRounds: 10
}