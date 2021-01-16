import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.events.on('change', ():void => {console.log('Change 1')});
user.events.trigger('change');

// const fetchUser = new User({id: 2});
// fetchUser.set({name: "Kim", age: 28});
// fetchUser.save();
