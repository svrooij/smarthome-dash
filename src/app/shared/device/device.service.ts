import { Injectable } from '@angular/core';
import { MqttService, MqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { Device } from './device';
import { BehaviorSubject,Observable } from "rxjs";
@Injectable()
export class DeviceService {
  private devices: Device[] = new Array();
  private devicesSubject: BehaviorSubject<Device[]>;
  private devicePublishTimeout: any;
  
  constructor(private mqttService: MqttService) {
    this.devicesSubject = new BehaviorSubject(this.devices);
    

    this.mqttService.state.subscribe((state: MqttConnectionState)=>{
      if(state == MqttConnectionState.CONNECTED){
        this.mqttService.observe('+/status/#').subscribe((message: MqttMessage)=>{
          let deviceIndex = this.devices.findIndex(device => device.topic === message.topic);
          if(deviceIndex > -1){
            this.devices[deviceIndex].updatePayload(message.payload.toString());
          } else {
            this.devices.push(Device.fromMessage(message));
            this.publishDevices();
          }
        });
      }
    });
  }

  private publishDevices(){
    if(this.devicePublishTimeout)
      clearTimeout(this.devicePublishTimeout);

    this.devicePublishTimeout = setTimeout(()=>{
      this.devicesSubject.next(this.devices);
    },150);
  }

  public get allDevices() : Observable<Device[]> {
    return this.devicesSubject.asObservable();
  }

  public getByKind(kind: string) : Device[] {
    let filtered = this.devices.filter(device => device.kind === kind);
    // console.log('Devices filtered by ' + kind );
    // filtered.forEach((val,index)=>{
    //   console.log(val.topic);
    // });
    return filtered;
  }

}
