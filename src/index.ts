import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.on('change', ():void => {console.log('User value updated')});
user.set({name: 'Kim'});
