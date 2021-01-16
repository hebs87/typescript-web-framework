import axios, {AxiosResponse} from "axios";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// Declare an annotation type for a callback function - takes no arguments and returns nothing
type Callback = () => void;

export class User {
  // Event object that holds keys that are strings with arrays of callback functions as their properties
  events: {[key: string]: Callback[]} = {};

  constructor(private data: UserProps) {}

  get = (propName: string): string | number | undefined => {
    return this.data[propName as keyof UserProps];
  };

  // Partial ensures that the props are optional here, but still ensures they are mandatory when creating new User
  set = (update: Partial<UserProps>): void => {
    Object.assign(this.data, update)
  };

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

  fetch = (): void => {
    axios.get(` http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        console.log(res.data);
        this.set(res.data);
      })
      .catch((error: AxiosResponse): void => {
        console.log(error)
      });
  }
}
