import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
console.log(user.get('name'));
console.log(user.get('age'));
