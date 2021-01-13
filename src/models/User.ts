interface UserProps {
  name: string;
  age: number;
}

// Declare an annotation type for a callback function - takes no arguments and returns nothing
type Callback = () => {};

export class User {
  constructor(private data: UserProps) {}

  get = (propName: string): string | number => {
    return this.data[propName as keyof UserProps];
  };

  // Partial ensures that the props are optional here, but still ensures they are mandatory when creating new User
  set = (update: Partial<UserProps>): void => {
    Object.assign(this.data, update)
  };
}
