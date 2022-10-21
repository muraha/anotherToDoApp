export interface ITaskRequired {
  title: string;
  description: string;
}

export interface ITask extends ITaskRequired{
  id: number;
  isDone?: boolean;
  doneDate?: Date | null;
}

export interface DataTasks {
  data: ITask[];
  total: number;
}