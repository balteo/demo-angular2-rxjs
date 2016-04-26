import {Component} from "angular2/core";
import {AppService} from "./app.services.ts";

@Component({
    selector: 'my-second',
    template: `
<div>
    <ul>
        <li *ngFor="#s of appService.someObservable$ | async">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class SecondComponent {

    constructor(private appService:AppService) {
        console.log('constructor', 'second');
    }

}
