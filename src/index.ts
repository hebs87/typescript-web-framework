import {User} from "./models/User";

// const user = User.buildUser({id: 3, name: 'Dixie', age: 4});
// user.on('change', ():void => {console.log(user)});
// user.on('save', ():void => {console.log('User successfully saved')});
// // user.fetch();
// user.fetch();

const collection = User.buildUserCollection();
collection.on('change', () => {
  console.log(collection)
});
collection.fetch();
