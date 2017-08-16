import { Injectable } from '@angular/core';
import { MqttSettings} from './mqttsettings';
import { MqttService } from 'ngx-mqtt';

@Injectable()
export class SettingsService {
  private static mqttSettingsKey = 'mqtt-settings';

  private static MQTT_SERVICE_OPTIONS = {
    connectOnCreate: false
  };

  static mqttServiceFactory() {
    console.log('Using mqttServiceFactory');
    const settingsService = new SettingsService();
    const settings = settingsService.getMqttSettings();
    if (settings.fromSettings) {
      return new MqttService(settings);
    }
    return new MqttService(SettingsService.MQTT_SERVICE_OPTIONS);
  }

  constructor() { }

  saveMqttSettings(newSettings: MqttSettings) {
    localStorage.setItem(SettingsService.mqttSettingsKey, JSON.stringify(newSettings));
  }

  getMqttSettings(): MqttSettings {
    const data = localStorage.getItem(SettingsService.mqttSettingsKey);
    if (data) {
      return MqttSettings.fromJson(data);
    }
    console.log('No mqtt settings');
    return MqttSettings.default();
  }

  clear() {
    console.log('Clearing all settings!');
    localStorage.clear();
  }
}
