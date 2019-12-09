import baseRepo from './baseRepo';
import User from '../../models/user';

class userRepo extends baseRepo {
    /**
     * function get user
     * @param {number} id  
     */
    async createUser(data){
        try {
            const responses = await User.create(data);
            return responses;
        } catch (error) {
            console.log(error);
        }
    }
    async getUserById({ id }){
        try {
            const responses = await User.findOne({ user_id: id });
            return responses;
        } catch (error) {
            console.log(error);
        }
    }
}

export default userRepo;