import { Component, Input, OnChanges } from '@angular/core';
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
  @Input() tasks: ITask[] = []
  doneTasks: ITask[] = []
  taskQty = 0
  doneQty = 0
  doneQtyT = 0
  doneQtyW = 0
  doneQtyM = 0

  constructor() { '' }

  ngOnChanges(): void {
    const { doneTasks, qty } = this.getDone(this.tasks)
    const countTaskForPeriod = this.getTaskCounterPerPeriod(doneTasks)

    this.doneTasks = doneTasks
    this.doneQty = qty

    this.taskQty = this.tasks.length
    this.doneQtyT = countTaskForPeriod(Period.today)
    this.doneQtyW = countTaskForPeriod(Period.week)
    this.doneQtyM = countTaskForPeriod(Period.month)
  }

  getDone(t: ITask[]) {
    const doneTasks = t.filter(t => t.isDone)
    return {
      doneTasks,
      qty: doneTasks.length
    }
  }

  getTaskCounterPerPeriod(tasks: ITask[]) {
    const now = new Date()

    const periodDayMap = {
      today: now.setHours(0, 0, 0, 0),
      week: now.setDate(now.getDate() - 7).valueOf(),
      month: now.setMonth(now.getMonth() - 1).valueOf()
    }

    return (value: Period) => tasks.filter(t => {
      const doneDate = new Date(t.doneDate)
      return doneDate?.valueOf() > periodDayMap[value].valueOf()
    }).length
  }
}
