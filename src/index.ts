import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.on('change', ():void => {console.log('Change 1')});
user.trigger('change');
user.get('name');
