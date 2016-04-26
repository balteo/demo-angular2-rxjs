import {Component, OnInit, NgZone} from "angular2/core";
import {AppService} from "./app.services.ts";
import 'rxjs/Rx';


@Component({
    selector: 'my-first',
    template: `
<div>
    <ul>
        <li *ngFor="#s of someStrings">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class FirstComponent implements OnInit {

    zone:NgZone;

    constructor(private appService:AppService) {
        console.log('constructor', 'first');
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    someStrings:string[] = [];

    ngOnInit() {
        console.log('ngOnInit', 'first');
        this.appService.refCounted.subscribe(
            theStrings=> {
                this.zone.run(() =>this.someStrings.push(...theStrings));
            },
            error=>console.log(error)
        );
    }
}
