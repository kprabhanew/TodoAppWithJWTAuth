import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    console.log('%c TodosComponent -> CONSTRUCTOR : ', 'background: #093145; color: #FFF');
  }

  public ngOnInit() {
    console.log('%c TodosComponent -> ngOnInit : ', 'background: #093145; color: #FFF');
    this.route.data
      .map((data) => data['todos'])
      .subscribe(
        (todos) => {
          console.log('%c TodosComponent -> ngOnInit -> Subscribe : ', 'background: #093145; color: #FFF', todos);
          this.todos = todos;
        }
      );
  }

  onAddTodo(todo) {
    console.log('%c TodosComponent -> onAddTodo : ', 'background: #093145; color: #FFF', todo);
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          console.log('%c TodosComponent -> onAddTodo -> subscribe : ', 'background: #093145; color: #FFF', newTodo);
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    console.log('%c TodosComponent -> onToggleTodoComplete : ', 'background: #093145; color: #FFF', todo);
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          console.log('%c TodosComponent -> onToggleTodoComplete -> subscribe - updatedValue : ', 'background: #093145; color: #FFF', updatedTodo);
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    console.log('%c TodosComponent -> onRemoveTodo : ', 'background: #093145; color: #FFF', todo);
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          console.log('%c TodosComponent -> onRemoveTodo -> subscribe : ', 'background: #093145; color: #FFF', _);
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  public doSignOut() {
    console.log('%c TodosComponent -> doSignOut : ', 'background: #093145; color: #FFF');
    this.auth.doSignOut();
    this.router.navigate(['/sign-in']);
  }

}
