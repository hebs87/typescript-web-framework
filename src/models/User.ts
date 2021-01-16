import axios, {AxiosResponse} from "axios";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps) {}

  get = (propName: string): string | number | undefined => {
    return this.data[propName as keyof UserProps];
  };

  // Partial ensures that the props are optional here, but still ensures they are mandatory when creating new User
  set = (update: Partial<UserProps>): void => {
    Object.assign(this.data, update)
  };

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
