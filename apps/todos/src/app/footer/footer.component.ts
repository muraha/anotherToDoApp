import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ITask } from '@another-todo-app/api-interfaces';

enum Period {
  today = 'today',
  week = 'week',
  month = 'month',
}

@Component({
  selector: 'todo-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnChanges {
  @Input() tasks:ITask[] = []
  taskQty = 0
  doneQty = 0
  doneQtyT = 0
  doneQtyW = 0
  doneQtyM = 0

  constructor() {''}
  
  ngOnChanges(): void {''
  const numberOfTaskFor = this.getTaskCounterPerPeriod(this.tasks)

    console.log("🚀 ~ file: footer.component.ts ~ line 20 ~ FooterComponent ~ ngOnChanges ~ ngOnChanges")
    this.doneQty = this.calcDone(this.tasks)
    this.doneQtyT = numberOfTaskFor(Period.today)
    this.doneQtyW = numberOfTaskFor(Period.week)
    this.doneQtyM = numberOfTaskFor(Period.month)
    this.taskQty = this.tasks.length
  }

  calcDone(t:ITask[]){
    return t.filter(t => t.isDone).length
  }

  getTaskCounterPerPeriod(tasks:ITask[]) {
    const now = new Date()

    const periodDayMap = {
      today: now.setHours(0, 0, 0, 0),
      week: now.setDate(now.getDate() - 7).valueOf(),
      month: now.setMonth(now.getMonth() - 1).valueOf()
    }

    return (value:Period) => {
      return tasks.filter(t => {
        const doneDate = new Date(t.doneDate)
        if(!doneDate?.valueOf()) return false
        return doneDate?.valueOf() > periodDayMap[value].valueOf()
      }).length
    }    
  }
}
