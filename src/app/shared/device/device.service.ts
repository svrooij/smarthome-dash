import { Injectable } from '@angular/core';
import { MqttService, MqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { Device } from './device';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeviceService {
  private devices: Device[] = new Array();
  private devicesSubject: BehaviorSubject<Device[]>;
  private devicePublishTimeout: any;

  constructor(private mqttService: MqttService) {
    this.devicesSubject = new BehaviorSubject(this.devices);


    this.mqttService.state.subscribe((state: MqttConnectionState) => {
      if (state === MqttConnectionState.CONNECTED) {
        this.mqttService.observe('+/status/#').subscribe((message: MqttMessage) => {
          const deviceIndex = this.devices.findIndex(device => device.topic === message.topic);
          if (deviceIndex > -1) {
            this.devices[deviceIndex].updatePayload(message.payload.toString());
          } else {
            this.devices.push(Device.fromMessage(message));
            this.publishDevices();
          }
        });
      }
    });
  }

  private publishDevices() {
    if (this.devicePublishTimeout) {
      clearTimeout(this.devicePublishTimeout);
    }

    this.devicePublishTimeout = setTimeout(() => {
      this.devicesSubject.next(this.devices);
    }, 150);
  }

  public get allDevices(): Observable<Device[]> {
    return this.devicesSubject.asObservable();
  }

  public getByKind(kind: string): Device[] {
    const filtered = this.devices.filter(device => device.kind === kind);
    // console.log('Devices filtered by ' + kind );
    // filtered.forEach((val,index)=>{
    //   console.log(val.topic);
    // });
    return filtered;
  }

  public sortByLastChange (a: Device, b: Device) {
    if (a.lastChange > b.lastChange) {
      return 1;
    } else if (a.lastChange < b.lastChange) {
      return -1;
    }
    return 0;
  }

  public sortByName (a: Device, b: Device) {
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    }
    return 0;
  }
}
