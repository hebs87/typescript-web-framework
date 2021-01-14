interface UserProps {
  name: string;
  age: number;
}

// Declare an annotation type for a callback function - takes no arguments and returns nothing
type Callback = () => void;

export class User {
  // Event object that holds keys that are strings with arrays of callback functions as their properties
  events: {[key: string]: Callback[]} = {};

  constructor(private data: UserProps) {}

  get = (propName: string): string | number => {
    return this.data[propName as keyof UserProps];
  };

  // Partial ensures that the props are optional here, but still ensures they are mandatory when creating new User
  set = (update: Partial<UserProps>): void => {
    Object.assign(this.data, update)
  };

  on = (eventName: string, callback: Callback): void => {

  };
}
