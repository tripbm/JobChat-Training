import baseRepo from './baseRepo';
import Message from '../../models/message';
import GroupMessage from '../../models/groupMessage';

const MESSAGE_ADDED = "messageAdded"
class messageRepo extends baseRepo {
    constructor(){
        super()
    }
    async getAll({ page = 0, limit = LIMIT }){
        try {
            const responses = await Message.find().skip(page).limit(limit);
            return responses;
        } catch (error) {
            console.log(error);
        }
    }
    async getGroupChat({ page = 0, limit = LIMIT }){
        try {
            const responses = await GroupMessage.find().skip(page).limit(limit);
            return responses;
        } catch (error) {
            console.log(error);
        }
    }
    async addMessage(args, context){
        try {
            const message = await Message.create(args);
            context.pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
            return message
        } catch (error) {
            console.log(error);
        }
    }

    async createGroupChat(data) {
        try {
            const responses = await new GroupMessage(data.data).save();
            let results = {
                message: "Create group chat false",
                error: 1
            }

            if (responses) {
                results = {
                    message: "Create group chat success",
                    error: 0
                }
            }

            return results
        } catch (error) {
            console.log(error);
        }
    }

}

export default messageRepo;