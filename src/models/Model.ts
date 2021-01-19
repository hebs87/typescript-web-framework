import {AxiosPromise, AxiosResponse} from "axios";
import {Callback} from "./Eventing";

// Interface for Attributes - Generic interface
interface ModelAttributes<T> {
  set: (value: T) => void;
  getAll: () => T;
  get: <K extends keyof T>(Key: K) => T[K];
}

// Interface for Eventing
interface Events {
  on: (eventName: string, callback: Callback) => void;
  trigger: (eventName: string) => void;
}

// Interface for Sync
interface Sync<T> {
  fetch: (id: number) => AxiosPromise;
  save: (data: T) => AxiosPromise;
}

// Interface HasId to stipulate that the id will be passed in to satisfy the model's fetch() method
interface HasId {
  id?: number;
}

// Generic class that accepts different data types - the data type that the relevant interfaces accept
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ){}

  // Getter to act as a pass through to the Eventing class on method
  on = this.events.on;

  // Getter to act as a pass through to the Eventing class trigger method
  trigger = this.events.trigger;

  // Getter to act as a pass through to the Attributes class get method
  get = this.attributes.get;

  // Update user object and trigger change event
  set = (update: T): void => {
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
