import axios, {AxiosResponse} from "axios";


export class Sync {
  fetch = (): void => {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        console.log(res.data);
        this.set(res.data);
      })
      .catch((error: AxiosResponse): void => {
        console.log(error)
      });
  };

  save = (): void => {
    const id = this.get('id');

    if (id) {
      // put
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      // post
      axios.post('http://localhost:3000/users', this.data);
    }
  };
}
