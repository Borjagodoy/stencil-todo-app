import { Component, Prop, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'my-todo-list',
  styleUrl: 'my-todo-list.scss'
})
export class MyTodoList {
  @Element() todoListElement: any;
  @State() firebaseElement: any;
  @State() last: string;
  
  @State() todoList: Array<any> = [];
 
  @Listen ('todoCompleted')
    todoCompletedHandler(event: CustomEvent) {
      const task = {taskName: event.detail, isSelected: false};
      this.addNewItem(task);
    }
  @Listen ('response')
    setList(event: CustomEvent) {
      if(event.detail){
          this.todoList = [
          ...event.detail
          ];
        } else {
          this.todoList = [];
        }
    }
    addNewItem(task) {
      if(!this.includeTask(task)) {
        task.id = this.todoList.length;
        this.firebaseElement.setItem(`locations/${this.todoList.length}`, task)
      }
    }
  componentDidLoad() {
    this.firebaseElement = this.todoListElement.querySelector('firebase-stencil');
    this.firebaseElement.getItem(`locations`);
  }
  includeTask(task) {
    return this.todoList.find((taskItem) => taskItem.taskName === task.taskName )
  }
  preshCheckbox(todo) {
    console.log('event', todo);
    console.log()
    todo.isSelected = !todo.isSelected;
    this.updateItem(todo);
  }
  updateItem(task) {
    console.log(`locations/${task.id}`)
    this.firebaseElement.setItem(`locations/${task.id}/isSelected`, task.isSelected)
  }
  render() {
      return[
        <firebase-stencil></firebase-stencil>,
        <my-input-task></my-input-task>,
          <ul>
            {this.todoList.map((todo) => 
                <div class="checkbox">
                  <label>
                    <input type="checkbox" onChange={ (event) => this.preshCheckbox(todo) } checked={todo.isSelected}/><i class="helper"></i>                  {todo.taskName} 

                  </label>
                </div>
              )
            }
          </ul>
      ];
  }
}
