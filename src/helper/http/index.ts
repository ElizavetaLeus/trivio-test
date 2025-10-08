export interface Note {
  id: string;
  category: string;
  text: string;
  createdAt?:string;
}
export type NoteList = Array<Note>;

export interface Http {
  baseURL: string;
  get: (endpoint: string) => Promise<NoteList>;
  post: (endpoint: string, body: Omit<Note, 'id'>) => Promise<Note>;
  delete: (endpoint: string, id: string) => void;
}

class HTTP implements Http {
  baseURL = 'http://localhost:3000';
  async get (endpoint: string) {
    return await fetch(this.baseURL + endpoint).then((resp) => resp.json());
  };
  async post (endpoint: string, body: Omit<Note, 'id'>) {
    return await fetch(this.baseURL + endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  };
  async delete (endpoint: string, id: string) {
    await fetch(this.baseURL + endpoint + id, {
      method: 'DELETE',
    });
  };
}

export default HTTP;
