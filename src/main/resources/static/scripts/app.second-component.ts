import {Component, OnInit, NgZone} from "angular2/core";
import {AppService} from "./app.services.ts";

@Component({
    selector: 'my-second',
    template: `
<div>
    <ul>
        <li *ngFor="#s of someStrings">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class SecondComponent implements OnInit {

    zone:NgZone;

    constructor(private appService:AppService) {
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    someStrings:string[] = [];

    ngOnInit() {
        this.appService.someMethod().subscribe(
            theStrings=> {
                this.zone.run(() =>this.someStrings.push(...theStrings));
            },
            error=>console.log(error)
        );
    }
}
