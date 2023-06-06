export class Todoitem {
  description:string;
  action:boolean;

  constructor(description:string, action:boolean) {
    this.description = description;
    this.action = action;
  }
}
