import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html',
    styleUrls: ['maps.component.css']
})

export class MapsComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public zoom: number;
    ngOnInit() {
        this.latitude = 51.4396519;
        this.longitude = 5.4629674;
        this.zoom = 14;
    }
}
