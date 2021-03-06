import {Injectable, NgZone} from "angular2/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AppService {

    constructor(private zone:NgZone) {
        console.log('constructor', 'appService');
        this.constructSomeObservable();
    }

    someObservable$:Observable <string[]>;

    constructSomeObservable() {
        this.someObservable$ = Observable.create(observer => {
                const eventSource = new EventSource('/interval-sse-observable');
                eventSource.onmessage = x => this.zone.run(() =>observer.next(JSON.parse(x.data)));
                eventSource.onerror = x => observer.error(console.log('EventSource failed'));
                return () => {
                    eventSource.close();
                };
            })
            .startWith([])
            .scan((acc, value) => acc.concat(value));
    }
}
