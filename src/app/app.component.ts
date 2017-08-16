import { Component, OnDestroy } from '@angular/core';
import { MqttService, MqttConnectionState } from 'ngx-mqtt';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {

  constructor (private mqttService: MqttService) {
  }

  ngOnDestroy() {
    // Check if we are still connected, and then disconnect.
    const subscribtion = this.mqttService.state.subscribe((state: MqttConnectionState) => {
      if (state === MqttConnectionState.CONNECTED) {
        this.mqttService.disconnect();
        subscribtion.unsubscribe();
      }
    });
  }
}
