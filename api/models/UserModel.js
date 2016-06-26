import mongoose from 'mongoose';

export default conn => {
    try {
        let UserModel;
        const schema = new mongoose.Schema(require('./userModel.json'), {collection: 'Users'});

        schema.statics.serialize = (data) => new UserModel(data).save().then(user => user._id);

        schema.statics.deserialize = (id) => {
            return new Promise((resolve, reject) => {
                UserModel.findById(id, (err, user) => {
                    err ? reject(err) : resolve(user);
                });
            });
        };

        UserModel = conn.model('Users', schema);
        return UserModel;
    } catch (err) {
        console.log('error in UserModel:', err);
    }
};
