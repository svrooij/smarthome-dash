import { Injectable } from '@angular/core';
import { MqttSettings} from './mqttsettings';
import { MqttService } from 'ngx-mqtt';

@Injectable()
export class SettingsService {

  constructor() { }

  private static mqttSettingsKey: string = "mqtt-settings";
  saveMqttSettings(newSettings: MqttSettings) {
    localStorage.setItem(SettingsService.mqttSettingsKey,JSON.stringify(newSettings));
  }

  getMqttSettings(): MqttSettings {
    let data = localStorage.getItem(SettingsService.mqttSettingsKey);
    if(data){
      return MqttSettings.fromJson(data);
    }
    console.log('No mqtt settings');
    return MqttSettings.default();
  }

  clear() {
    console.log("Clearing all settings!");
    localStorage.clear();
  }


  private static MQTT_SERVICE_OPTIONS = {
    connectOnCreate: false
  };
  
  static mqttServiceFactory() {
    console.log("Using mqttServiceFactory");
    let settingsService = new SettingsService();
    let settings = settingsService.getMqttSettings();
    if(settings.fromSettings)
      return new MqttService(settings);
    else
      return new MqttService(SettingsService.MQTT_SERVICE_OPTIONS);
  }

}
