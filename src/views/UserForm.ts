import {Callback} from "../models/Eventing";
import {User, UserProps} from "../models/User";
import {View} from "./View";

export class UserForm extends View<User, UserProps> {
  // Map of the event handlers - the key is the handler:querySelector, and the value is the callback function
  eventsMap = (): {[key: string]: Callback} => {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    };
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    // Get the input value and set the user name to that
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({name});
    }
  };

  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <p>Name: ${this.model.get('name')}</p>
        <p>Age: ${this.model.get('age')}</p>
        <input type="text"/>
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  };
}
