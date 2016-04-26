import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';


@Injectable()
export class AppService {

    constructor() {
        console.log('constructor', 'appService');
        this.constructSomething();
    }

    someStrings:string[] = [];

    constructSomething() {
        let someObservable$:Observable < string[] > = Observable.create(observer => {
            const eventSource = new EventSource('/interval-sse-observable');
            eventSource.onmessage = x => observer.next(JSON.parse(x.data));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));
            return () => {
                eventSource.close();
            };
        });

        let subject$ = new Subject();
        let refCounted = someObservable$.multicast(subject$).refCount();

        refCounted.subscribe(
            theStrings=> {
                this.someStrings.push(...theStrings);
            },
            error=>console.log(error)
        );
    }
}
