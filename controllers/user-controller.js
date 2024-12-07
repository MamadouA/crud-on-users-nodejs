import UserModel from "../models/user-model.js";

class UserController {
    static all = () => UserModel;
    static find = (id) => UserModel.find((user) => user.id == id);
    static store = (user) => UserModel.push(user);
    static update = (id, newUser) => UserModel.forEach((user) => {
        if(user.id === id) {
            user.firstname = newUser.firstname;
            user.lastname = newUser.lastname;
        }
    });
    static delete = (id) => UserModel.filter((user) => user.id != id);
}

export default UserController;