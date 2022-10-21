import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

  constructor() {''}

  submitForm(data: any) {
    this.subject.next(data)
  }

  onSubmit():Observable<any> {
    return this.subject.asObservable(); 
  }
}

