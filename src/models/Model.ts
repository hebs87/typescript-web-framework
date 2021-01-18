import {AxiosPromise, AxiosResponse} from "axios";
import {Callback} from "./Eventing";

// Interface for Attributes - Generic interface
interface ModelAttributes<T> {
  set: (value: T) => void;
  getAll: () => T;
  get: <K extends keyof T>(Key: K) => T[K];
}

// Interface for Sync
interface Sync<T> {
  fetch: (id: number) => AxiosPromise;
  save: (data: T) => AxiosPromise;
}

// Interface for Eventing
interface Events {
  on: (eventName: string, callback: Callback) => void;
  trigger: (eventName: string) => void;
}

export class Model {

}
