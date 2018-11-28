import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class NotificationService {

  private sub = new Subject<any>();
  public emitter = this.sub.asObservable();
  display(display, message) {
    this.sub.next({ display, message });
  }

}
