import { User } from "./models/User";

const user = new User({id: 1, name: 'Sunny', age: 33});
user.on('change', ():void => {console.log(user)});
user.on('save', ():void => {console.log('User successfully saved')});
// user.fetch();
user.save();
