import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionService } from './session.service';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private session: SessionService
  ) {
    console.log('%c ApiService -> CONSTRUCTOR : ', 'background: #A3B86C; color: #FFF');
  }
  public signIn(username: string, password: string) {
    console.log('%c ApiService -> signIn : ', 'background: #A3B86C; color: #FFF');
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .map(response => 
        response.json()
      )
      .catch(this.handleError);
  }


  public getAllTodos(): Observable<Todo[]> {
    console.log('%c ApiService -> getAllTodos : ', 'background: #A3B86C; color: #FFF');
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos', options)
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    console.log('%c ApiService -> createTodo \'Beforer Post \' : ', 'background: #A3B86C; color: #FFF', todo);
    const options = this.getRequestOptions();
    return this.http
      .post(API_URL + '/todos', todo, options)
      .map(response => {
        console.log('%c ApiService -> createTodo \'After Post From JSON\' : ', 'background: #A3B86C; color: #FFF', );
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public getTodoById(todoId: number): Observable<Todo> {
    console.log('%c ApiService -> getTodoById : ', 'background: #A3B86C; color: #FFF');
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos/' + todoId, options)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    console.log('%c ApiService -> updateTodo : ', 'background: #A3B86C; color: #FFF');
    const options = this.getRequestOptions();
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo, options)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public deleteTodoById(todoId: number): Observable<null> {
    console.log('%c ApiService -> deleteTodoById : ', 'background: #A3B86C; color: #FFF');
    const options = this.getRequestOptions();
    return this.http
      .delete(API_URL + '/todos/' + todoId, options)
      .map(response => null)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.log('%c ApiService -> handleError : ', 'background: #A3B86C; color: #FFF');
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  private getRequestOptions() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return new RequestOptions({ headers });
  }
}
