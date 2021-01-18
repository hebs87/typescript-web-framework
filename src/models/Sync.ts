import axios, {AxiosResponse, AxiosPromise} from "axios";

interface HasId {
  id?: number;
}

// Generic class which accepts any argument type, but it extends HasId, which tells TypeScript that it will have an id
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch = (id: number): AxiosPromise => {
    // This method is only responsible for fetching the data. The User class will then be responsible for processing it
    return axios.get(`${this.rootUrl}/${id}`);
  };

  save = (data: T): AxiosPromise => {
    const {id} = data;

    if (id) {
      // put
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // post
      return axios.post(this.rootUrl, data);
    }
  };
}
