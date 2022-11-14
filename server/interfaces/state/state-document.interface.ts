import { TasksDocument } from "../task/task-document.interface";

export interface StateDocument {
  name: string;
  tasks: [Task];
}
