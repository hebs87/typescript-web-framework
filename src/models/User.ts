import {Eventing} from "./Eventing";
import {Sync} from "./Sync";
import {Attributes} from "./Attributes";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  // Initialise Eventing class to enable calling it from User
  public events: Eventing = new Eventing();
  // Initialise Sync class to enable calling it from User
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  // Create attributes property
  public attributes: Attributes<UserProps>;

  constructor(private attrs: UserProps) {
    // Initialise Attributes class to enable calling it from User, pass in attrs object
    this.attributes = new Attributes<UserProps>(attrs);
  };

  // Getter to act as a pass through to the Eventing class on method
  get on() {
    return this.events.on;
  };

  // Getter to act as a pass through to the Eventing class trigger method
  get trigger() {
    return this.events.trigger;
  };

  // Getter to act as a pass through to the Attributes class get method
  get get() {
    return this.attributes.get;
  };

  set = (update: UserProps): void => {
    this.attributes.set(update);
    this.events.trigger('change');
  };
}
