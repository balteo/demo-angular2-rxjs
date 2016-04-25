import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";


@Injectable()
export class AppService {

    someMethod() {
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
