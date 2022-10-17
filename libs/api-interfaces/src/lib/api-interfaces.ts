export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  doneDate?: Date | null;
}