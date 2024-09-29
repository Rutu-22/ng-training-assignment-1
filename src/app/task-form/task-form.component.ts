import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = { id: 0, assignedTo: '', status: 'Not Started', dueDate: '', priority: 'Normal', comments: '' };
  
  constructor(private taskService: TaskService, private router: Router) {}

  saveTask(): void {
    this.taskService.addTask(this.task);
    this.router.navigate(['/']).then(() => {
      localStorage.setItem('message', 'Task saved successfully!');
    });
  }
}
