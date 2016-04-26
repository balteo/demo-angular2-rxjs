import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';


@Injectable()
export class AppService {

    constructor(){
        console.log('constructor', 'appService');
    }

    someObservable$:Observable<string[]> = Observable.create(observer => {
        const eventSource = new EventSource('/interval-sse-observable');
        eventSource.onmessage = x => observer.next(JSON.parse(x.data));
        eventSource.onerror = x => observer.error(console.log('EventSource failed'));

        return () => {
            eventSource.close();
        };
    });

    subject$ = new Subject();

    refCounted = this.someObservable$.multicast(this.subject$).refCount();

    someMethod_() {
        let someObservable$:Observable<string[]> = Observable.create(observer => {
            const eventSource = new EventSource('/interval-sse-observable');
            eventSource.onmessage = x => observer.next(JSON.parse(x.data));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));

            return () => {
                eventSource.close();
            };
        });
        return someObservable$;
    }
}
