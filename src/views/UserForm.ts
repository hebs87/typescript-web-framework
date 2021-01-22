import {Callback} from "../models/Eventing";
import {User} from "../models/User";

export class UserForm {
  constructor(
    public parent: Element,
    public model: User
  ) {
    // Render the HTML each time there is a change to the values
    this.bindModel();
  }

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  };

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

  // Helper method that takes a reference of a document fragment and parses and binds the relevant event handlers
  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // Destructure the first and second elements in the split array and call them eventName and selector
      const [eventName, selector] = eventKey.split(':');
      // Select all relevant elements in the fragment and bind the relevant handler method to it
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  };

  render = (): void => {
    // Clear parent innerHTML each time the render method is called to prevent multiple elements being rendered
    this.parent.innerHTML = '';
    // Create a template element, set its inner HTMl to the string rendered in the template method
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Bind event handlers to the templateElement content
    this.bindEvents(templateElement.content);
    // Append the templateElement content to the parent element - content is the actual HTML that gets appended
    this.parent.append(templateElement.content);
  };
}
