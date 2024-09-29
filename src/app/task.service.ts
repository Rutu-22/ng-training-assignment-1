import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-12-10', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task is good' },
    { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is good' },
    { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task is good' },
  ];

  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.taskSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.taskSubject.next(this.tasks);
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.taskSubject.next(this.tasks);
  }
}
