export interface Todo {
  id?: string;
  name: string;
  description?: string;
  createdAt: Date;
  deadline: Date;
  priority: string;
  completed: boolean;
  creator: string;
}
