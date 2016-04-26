import {Component} from "angular2/core";
import {AppService} from "./app.services.ts";
import {Observable} from "rxjs/Rx";


@Component({
    selector: 'my-second',
    template: `
<div>
    <ul>
        <li *ngFor="#s of someObservable$ | async">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class SecondComponent {

    someObservable$:Observable <string[]>;

    constructor(private appService:AppService) {
        console.log('constructor', 'second');
        this.someObservable$ = appService.someObservable$;
    }

}
