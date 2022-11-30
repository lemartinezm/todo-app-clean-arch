export interface Team {
  id: string;
  name: string;
  leader: string;
  participants: Array<string>;
  todos: Array<string>;
}
