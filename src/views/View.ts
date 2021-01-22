import {Model} from "../models/Model";
import {Callback} from "../models/Eventing";

// T will be the User class that is passed in, and we will also get the UserProps (K), which will be passed into the
// generic Model class - T will have all the properties of the Model class, with K loaded into it
export abstract class View<T extends Model<K>, K> {
  // This will get filled with the relevant regions that we ultimately want to map our templates to
  regions: {[key: string]: Element} = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    // Render the HTML each time there is a change to the values
    this.bindModel();
  };

  // abstract methods tell us that this method will be passed in when the class is initialised
  abstract template(): string;

  // Dummy regionsMap method to all mapping elements/template to specific regions in UserEdit template
  regionsMap = (): {[key: string]: string} => {
    return {};
  };

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

  // Helper method that takes a reference of a document fragment and parses and binds the relevant region maps
  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      // Get the value at this key and set this as the regions object key, then set the matching element as the value
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  };

  // Dummy helper method to get defined in child class - called in render right before content gets pushed
  // This will contain our mapping logic
  onRender = (): void => {};

  render = (): void => {
    // Clear parent innerHTML each time the render method is called to prevent multiple elements being rendered
    this.parent.innerHTML = '';
    // Create a template element, set its inner HTMl to the string rendered in the template method
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Bind event handlers to the templateElement content
    this.bindEvents(templateElement.content);
    // Bind regions to the templateElement content
    this.mapRegions(templateElement.content);
    // Apply region mapping/nesting logic before pushing content to parent element
    this,this.onRender();
    // Append the templateElement content to the parent element - content is the actual HTML that gets appended
    this.parent.append(templateElement.content);
  };
}
