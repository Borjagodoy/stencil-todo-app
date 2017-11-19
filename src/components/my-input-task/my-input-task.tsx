import { Component, State, Listen, Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'my-input-task',
  styleUrl: 'my-input-task.scss'
})
export class MyInputTask {

  @State() task: string;
  
  @Event() todoCompleted: EventEmitter;

  @Listen('keydown.enter')
  handleClick(event: UIEvent) {
    if(this.task) {
      this.todoCompleted.emit(this.task);
      this.task = null;
    }
  }
  inputChange(event) {
    this.task = event.target.value;
  }
  render() {
      return[
        <div>
          <div class="form-group">
            <input type="text" value={this.task} onInput={ () => this.inputChange(event)}/>
            <label class="control-label">Task</label><i class="bar"></i>
          </div>
          <button onClick={ (event: UIEvent) => this.handleClick(event) }> New task</button>
        </div>
      ]
  }
}
