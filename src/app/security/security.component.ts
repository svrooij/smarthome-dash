import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../shared/device/device.service";
import { Device } from "../shared/device/device";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  public devices : Device[]
  constructor(private deviceService:DeviceService) {
    
    
   }

  ngOnInit() {
    this.deviceService.allDevices.subscribe(()=>{
      this.devices = this.deviceService.getByKind('magnet');
    });
    //this.devices = this.deviceService.getByKind('magnet');
    console.log('Got security devices ',this.devices.length);
  }

}
