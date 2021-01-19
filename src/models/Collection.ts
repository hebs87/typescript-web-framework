import axios, {AxiosResponse} from "axios";
import {Eventing} from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    // Function that takes in a json object of type k (UserProps) and returns an instance of type T (User)
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  };

  get trigger() {
    return this.events.trigger;
  };

  fetch = (): void => {
    axios.get(this.rootUrl)
      .then((res: AxiosResponse): void => {
        res.data.forEach((value: K) => {
          this.models.push(this.deserialize(value));
        });

        this.trigger('change');
      })
      .catch((error: AxiosResponse): void => {
        console.log(error);
      })
  };
}
