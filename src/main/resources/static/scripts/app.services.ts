import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class AppService {

    constructor() {
        console.log('constructor', 'appService');
        this.constructSomeObservable();
    }

    someStrings:string[] = [];

    constructSomeObservable() {
        let someObservable$:Observable < string[] > = Observable.create(observer => {
            const eventSource = new EventSource('/interval-sse-observable');
            eventSource.onmessage = x => observer.next(JSON.parse(x.data));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));
            return () => {
                eventSource.close();
            };
        });

        someObservable$.subscribe(
            theStrings=> {
                this.someStrings.push(...theStrings);
            },
            error=>console.log(error)
        );
    }
}
