import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model'; 
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array of Task
  taskToDelete: Task | null = null; // Task to delete
  message: string | null = null; // Message to display
  showDeleteModal: boolean = false; // Modal visibility flag

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.message = localStorage.getItem('message');
    localStorage.removeItem('message'); // Clear the message after displaying
  }

  // Load tasks from the service
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Open delete modal
  openDeleteModal(task: Task): void {
    this.taskToDelete = task;
    this.showDeleteModal = true; // Show the modal
  }

  // Close delete modal
  closeDeleteModal(): void {
    this.taskToDelete = null;
    this.showDeleteModal = false; // Hide the modal
  }

  // Delete the task
  deleteTask(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id); // No subscribe needed
      this.tasks = this.tasks.filter(t => t.id !== this.taskToDelete!.id);
      this.closeDeleteModal();
    }
  }
}
