import {AxiosResponse} from "axios";
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

  // Update user object and trigger change event
  set = (update: UserProps): void => {
    this.attributes.set(update);
    this.events.trigger('change');
  };

  // Get id, fetch matching user object and update values
  fetch = (): void => {
    const id = this.get('id');
    // Throw error if id is not a number or if there isn't an id
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch data without an id');
    }
    // Fetch the data and call the set method
    this.sync.fetch(id)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      })
      .catch((error: AxiosResponse): void => {
        this.events.trigger('error');
      });
  };

  save = (): void => {
    // Get all user attributes and save to db
    this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.events.trigger('save');
      })
      .catch((error: AxiosResponse): void => {
        this.events.trigger('error');
      });
  };
}
