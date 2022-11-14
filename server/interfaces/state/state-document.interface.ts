import { TaskDocument } from "../task/task-document.interface";

export interface StateDocument {
  name: string;
  tasks: TaskDocument[];
}
