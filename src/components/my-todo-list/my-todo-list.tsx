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
      console.log(task)
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
       this.todoList = [
        ...this.todoList,
        task
        ];
      this.firebaseElement.setItem(`locations`, this.todoList)
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
    const index = this.todoList.findIndex((item) => item.taskName ===  todo.taskName )
    this.firebaseElement.setItem(`locations/${index}/isSelected`, !todo.isSelected)
  }
  removeItem(todo) {
    const index = this.todoList.findIndex((item) => item.taskName ===  todo.taskName )
    this.todoList.splice(index, 1)
    this.firebaseElement.setItem(`locations`, this.todoList)
  }
  render() {
      const config={
        apiKey: "AIzaSyBC8Yk2kJEKZwSEAVyE-y6ZjhZFE8bNs4A",
        authDomain: "caceresrealbus.firebaseapp.com",
        databaseURL: "https://caceresrealbus.firebaseio.com",
        projectId: "caceresrealbus",
        storageBucket: "caceresrealbus.appspot.com",
        messagingSenderId: "481793810270"
      }
      return[
        <firebase-stencil config={config}></firebase-stencil>,
        <my-input-task></my-input-task>,
          <ul>
            {this.todoList.map((todo) => 
                <div class="checkbox item">
                  <label>
                    <input type="checkbox" onClick={ (event) => this.preshCheckbox(todo) } checked={todo.isSelected}/><i class="helper"></i>                  {todo.taskName} 
                  </label>
                  <img class="icon" onClick={ () => this.removeItem(todo) } src="/assets/icon/delete_icon.png" alt="borrar"/>
                </div>
              )
            }
          </ul>
      ];
  }
}
