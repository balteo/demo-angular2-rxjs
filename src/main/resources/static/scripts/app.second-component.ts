import {Component, OnInit, NgZone} from "angular2/core";
import {AppService} from "./app.services.ts";

@Component({
    selector: 'my-second',
    template: `
<div>
    <ul>
        <li *ngFor="#s of appService.someStrings">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class SecondComponent implements OnInit {

    zone:NgZone;

    constructor(private appService:AppService) {
        console.log('constructor', 'second');
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    ngOnInit() {
        console.log('ngOnInit', 'second');
    }
}
