import { Component, OnInit } from '@angular/core';
import { Device } from '../shared/device/';
import { DeviceService } from '../shared/device/device.service'

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  public devices: Device[]
  constructor(private deviceService: DeviceService) {


   }

  ngOnInit() {
    this.deviceService.allDevices.subscribe(() => {
      this.devices = this.deviceService.getByKind('magnet').concat(this.deviceService.getByKind('pir'))
        .sort(DeviceService.sortByLastChange);
    });
    console.log('Got security devices ', this.devices.length);
  }

}
