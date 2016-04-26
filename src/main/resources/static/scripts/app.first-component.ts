import {Component} from "angular2/core";
import {AppService} from "./app.services.ts";
import {Observable} from "rxjs/Rx";


@Component({
    selector: 'my-first',
    template: `
<div>
    <ul>
        <li *ngFor="#s of someObservable$ | async">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class FirstComponent {

    someObservable$:Observable <string[]>;

    constructor(private appService:AppService) {
        console.log('constructor', 'first');
        this.someObservable$ = appService.someObservable$;
    }
}
