import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.on('change', ():void => {console.log('change')});
user.on('change', ():void => {console.log('change 2')});
user.on('click', ():void => {console.log('click')});
console.log(user);