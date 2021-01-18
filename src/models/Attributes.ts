export class Attributes<T> {
  constructor(private data: T) {}

  // Function generics - K can only be one of the keys (key string value) of the relevant interface that is passed in
  // The key will be the K string value
  // The return type will be the return type of the matching key's type of the relevant interface that is passed in
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  // Partial ensures that the props are optional here, but still ensures they are mandatory when creating new User
  set = (update: Partial<T>): void => {
    Object.assign(this.data, update);
  };
}
