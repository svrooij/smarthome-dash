import { Component, OnInit } from '@angular/core';
import { Device } from '../shared/device';
import { DeviceService } from '../shared/device/device.service'

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit {
  public devices: Device[]
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.allDevices.subscribe(() => {
      this.devices = this.deviceService.getByKind('thermostat')
        .sort(DeviceService.sortByName);
    });
    console.log('Got climate devices ', this.devices.length);
  }

}
