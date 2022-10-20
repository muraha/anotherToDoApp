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

  // emit(event: string) {
  //   console.log('emitted')
  //   this.subject.next(event);
  // }

  // on(eventName: string, action: any): Subscription {
  //   console.log('on')
  //   return this.subject.pipe(
  //     filter( (e: any) => e.name === eventName),
  //     map( (e: any) => e["data"])).subscribe(action);
  // }

  submitForm(data: any) {
    this.subject.next(data)
  }

  onSubmit():Observable<any> {
    return this.subject.asObservable(); 
  }
}

