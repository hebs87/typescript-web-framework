import {User} from "./models/User";
import {UserForm} from "./views/UserForm";

const user = User.buildUser({name: 'Bruno', age: 1});

const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(
    root,
    user
  );

  userForm.render();
} else {
  throw new Error('Root not found!')
}
