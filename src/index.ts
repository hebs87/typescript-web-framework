import { User } from "./models/User";

const user = new User({name: 'Sunny', age: 33});
user.set({name: 'Kim', age: 28});
console.log(user.get('name'));
console.log(user.get('age'));
