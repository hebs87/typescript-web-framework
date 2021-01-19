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
    console.log('Button clicked');
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
    // Create a template element, set its inner HTMl to the string rendered in the template method
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Bind event handlers to the templateElement content
    this.bindEvents(templateElement.content);
    // Append the templateElement content to the parent element - content is the actual HTML that gets appended
    this.parent.append(templateElement.content);
  };
}
