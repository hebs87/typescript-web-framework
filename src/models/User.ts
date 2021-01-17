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
}
