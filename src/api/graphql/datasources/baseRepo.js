import User from '../../models/user';

export default class baseRepo {
    async getAll({ page, limit }){
        try {
            const responses = await User.find().skip(page).limit(limit);
            return responses;
        } catch (error) {
            console.log(error);
        }
    }
}