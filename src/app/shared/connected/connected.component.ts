import { Component, OnInit } from '@angular/core';
import { MqttService, MqttConnectionState } from 'ngx-mqtt';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.css']
})
export class ConnectedComponent implements OnInit {
  public mqttState: Observable<MqttConnectionState>;
  constructor(private mqttService: MqttService) {

    this.mqttState = this.mqttService.state;
   }

  ngOnInit() {
  }

}
