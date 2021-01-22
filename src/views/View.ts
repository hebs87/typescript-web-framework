import {Model} from "../models/Model";
import {Callback} from "../models/Eventing";

// T will be the User class that is passed in, and we will also get the UserProps (K), which will be passed into the
// generic Model class - T will have all the properties of the Model class, with K loaded into it
export abstract class View<T extends Model<K>, K> {
  constructor(
    public parent: Element,
    public model: T
  ) {
    // Render the HTML each time there is a change to the values
    this.bindModel();
  };

  // abstract methods tell us that this method will be passed in when the class is initialised
  abstract template(): string;

  // Create dummy method to allow it to be overridden by child classes
  eventsMap = (): {[key: string]: Callback} => {
    return {};
  }

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
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