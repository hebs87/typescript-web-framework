import { User, UserProps } from "./models/User";
import {Collection} from "./models/Collection";

// const user = User.buildUser({id: 3, name: 'Dixie', age: 4});
// user.on('change', ():void => {console.log(user)});
// user.on('save', ():void => {console.log('User successfully saved')});
// // user.fetch();
// user.fetch();

const collection = new Collection<User, UserProps>(
  'http://localhost:3000/users',
  (json: UserProps) => User.buildUser(json)
);
collection.on('change', () => {console.log(collection)});
collection.fetch();
