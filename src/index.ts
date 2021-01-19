import {User} from "./models/User";
import {UserForm} from "./views/UserForm";

const user = User.buildUser({name: 'Bruno', age: 1});

const userForm = new UserForm(
  document.getElementById('root'),
  user
);

userForm.render();
