import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'my-todo-list',
  styleUrl: 'my-todo-list.scss'
})
export class MyTodoList {
  @State() last: string;
  
  @State() todoList: Array<any> = [];
 
  @Listen ('todoCompleted')
    todoCompletedHandler(event: CustomEvent) {
      const task = {taskName: event.detail, isSelected: false};
      this.addNewItem(task);
    }
    addNewItem(task) {
      if(!this.includeTask(task)) {
        this.todoList = [
        ...this.todoList,
        task
        ];
      }
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
    const index = this.todoList.findIndex((taskList) => taskList.taskName === task.taskName);

    if(index !== -1) {
      this.todoList[index] = task;
       this.todoList = [...this.todoList];
    }
  }
  render() {
      return[
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
