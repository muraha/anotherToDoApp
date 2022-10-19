export interface ITask {
  id: number;
  title: string;
  isDone: boolean;
  doneDate?: Date | null;
}

export interface DataTasks {
  data: ITask[];
  total: number;
}