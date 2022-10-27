import { Injectable } from '@angular/core';
import { ITaskRequired } from '@another-todo-app/api-interfaces';
import { Observable, Subject,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private subject = new Subject();
  private subject2 = new Subject();
  private subject3 = new Subject();

  constructor() {''}

  submitForm(data: ITaskRequired) {
    this.subject.next(data)
  }

  onSubmit():Observable<any> {
    return this.subject.asObservable(); 
  }


  searchTask(text: string) {
    this.subject2.next(text)
  }

  onSearch():Observable<any> {
    return this.subject2.asObservable(); 
  }

  
  updateTask(data: ITaskRequired) {
    this.subject3.next(data)
  }

  onUpdate():Observable<any> {
    return this.subject3.asObservable(); 
  }
}

