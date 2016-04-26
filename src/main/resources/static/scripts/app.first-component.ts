import {Component} from "angular2/core";
import {AppService} from "./app.services.ts";
import "rxjs/Rx";


@Component({
    selector: 'my-first',
    template: `
<div>
    <ul>
        <li *ngFor="#s of appService.someObservable$ | async">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class FirstComponent {

    constructor(private appService:AppService) {
        console.log('constructor', 'first');
    }
}
