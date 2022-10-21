import { Injectable } from '@angular/core';
import { ITaskRequired } from '@another-todo-app/api-interfaces';
import { Observable, Subject,  } from 'rxjs';

// export enum Events {
//   'task submitted',
//   'add toggled'
// }

// export class EventData {
//   name: string;
//   data: any;
//   constructor(name: string, data: any) {
//     this.name = name;
//     this.data = data;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private subject = new Subject();
  private subject2 = new Subject();

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
}

