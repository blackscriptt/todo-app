import { Component } from '@angular/core';
import { Todoitem } from '../module/todoitem';
import { Todos } from '../module/todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  private name = "Kaan";
  private todoList = new Todos();

  public message:string | undefined;
  public displayAll:boolean = true;

  constructor() {
    this.todoList.items = this.getLSItems();
  }

  getName() {
    return this.name;
  }

  addItem(txtDesc:string) {
    if(txtDesc) {

      let data = { description: txtDesc, action: false };
      this.todoList.items.push(data);
      let items = this.getLSItems();
      items.push(data);

      localStorage.setItem("items", JSON.stringify(items));

    } else {
      this.message = "Alan boş geçilemez!";
    }
  }

  getItems() {
    if(this.displayAll) {
      return this.todoList.items;
    } else {
      return this.todoList.items.filter(item => !item.action);
    }
  }

  getLSItems() {
    let items:Todoitem[] = [];
    let value = localStorage.getItem("items");

    if(value != null) {
      items = JSON.parse(value);
    }

    return items;
  }

  allItems() {
    return this.todoList.items.length;
  }

  madeItems() {
    return this.todoList.items.filter(item => item.action).length;
  }

  onHoldItems() {
    return this.todoList.items.filter(item => !item.action).length;
  }

  onActionChanged(item:Todoitem) {
    let items = this.getLSItems();
    localStorage.removeItem("items");

    items.forEach(i => {
      if(i.description == item.description) {
        i.action = item.action;
      }
    });

    localStorage.setItem("items", JSON.stringify( items ));
  }

  clearLS() {
    localStorage.removeItem("items");

    this.todoList.items = this.getLSItems();
  }



  // items = ["item 1", "item 2", "item 3"];

  // items:Todoitem[] = [
  //   { description: "Kahvaltı", action: true },
  //   { description: "Spor", action: false },
  //   { description: "Alışveriş", action: false },
  //   { description: "Mola", action: false },
  // ]

}
