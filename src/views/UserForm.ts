import {Callback} from "../models/Eventing";

export class UserForm {
  constructor(public parent: Element) {}

  // Map of the event handlers - the key is the handler:elementName, and the value is the callback function
  eventsMap = (): {[key: string]: Callback} => {
    return {
      'click:button': this.onButtonClick,
    };
  };

  onButtonClick = (): void => {
    console.log('Hi there!');
  };

  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <input type="text"/>
        <button>Click Me</button>
      </div>
    `;
  };

  render = (): void => {
    // Create a template element, set its inner HTMl to the string rendered in the template method
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Append the templateElement content to the parent element - content is the actual HTML that gets appended
    this.parent.append(templateElement.content);
  };
}
