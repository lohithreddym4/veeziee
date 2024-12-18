import mongoose from "mongoose";

const UsersListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    id:{
        type: String,
        required: true,
    }
});
const UsersList =mongoose.models.usersData || mongoose.model("usersData", UsersListSchema);
export default UsersList;