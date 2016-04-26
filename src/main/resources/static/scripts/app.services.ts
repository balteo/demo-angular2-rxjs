import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class AppService {

    constructor() {
        console.log('constructor', 'appService');
        this.constructSomeObservable();
    }

    someObservable$:Observable <string[]>;

    constructSomeObservable() {
        this.someObservable$ = Observable.create(observer => {
            const eventSource = new EventSource('/interval-sse-observable');
            eventSource.onmessage = x => observer.next(JSON.parse(x.data));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));
            return () => {
                eventSource.close();
            };
        });

        this.someObservable$.subscribe(
            theStrings=> {
                console.log(theStrings);
                this.someObservable$ = this.someObservable$.concat(Observable.from(theStrings));
            },
            error=>console.log(error)
        );
    }
}
