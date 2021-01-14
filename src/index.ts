import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.on('change', ():void => {console.log('Change 1')});
user.on('change', ():void => {console.log('Change 2')});
user.on('click', ():void => {console.log('Click')});
user.trigger('change');
user.trigger('click');
