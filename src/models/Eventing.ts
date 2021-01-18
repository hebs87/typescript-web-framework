// Declare an annotation type for a callback function - takes no arguments and returns nothing
export type Callback = () => void;

export class Eventing {
  // Event object that holds keys that are strings with arrays of callback functions as their properties
  events: {[key: string]: Callback[]} = {};

  on = (eventName: string, callback: Callback): void => {
    // If the relevant key exists, we get that event handler. If not, get an empty array
    const handlers = this.events[eventName] || [];
    // Register the callback against the relevant event handler
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string):void => {
    const handlers = this.events[eventName];
    // Return if there are no handlers by that eventName
    if (!handlers || handlers.length === 0) {
      return;
    }
    // Loop through array of callbacks and invoke each one
    handlers.forEach((callback: Callback): void => callback());
  };
}
