import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Device } from './device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;
  constructor(private ref: ChangeDetectorRef) {

   }

  ngOnInit() {
    this.device.Payload.subscribe(() => {
      this.ref.detectChanges();
    })
  }

}
