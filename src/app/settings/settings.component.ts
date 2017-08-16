import { Component, OnInit } from '@angular/core';
import { MqttService, MqttConnectionState, MqttMessage } from 'ngx-mqtt';
import { MqttSettings} from './mqttsettings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit {

  model: MqttSettings;
  submitted = false;

  currentState: MqttConnectionState;

  constructor(private _mqttService: MqttService, private settingsService: SettingsService) {
    this.model = this.settingsService.getMqttSettings();

    this._mqttService.state.subscribe((state: MqttConnectionState) => {
      this.currentState = state;
    });

    this._mqttService.onConnect.subscribe(() => {
      console.log('Connected to mqtt');
    });
   }

   onSubmit() {
    this.submitted = true;
    this.settingsService.saveMqttSettings(this.model);
    this.disconnect();
    this._mqttService.connect(this.model);
   }

   clear() {
    this.disconnect();
    this.settingsService.clear();
    this.model = this.settingsService.getMqttSettings();
   }

   disconnect() {
    if (this.currentState === MqttConnectionState.CONNECTED) {
      this._mqttService.disconnect();
    }
   }

  ngOnInit() {
  }

}
