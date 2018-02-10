import { Device, MagnetDevice, ThermostatDevice } from '.'
import { MqttMessage } from 'ngx-mqtt';

export class DeviceCreator {
    static CreateDeviceFromMqttMessage(message: MqttMessage): Device {
        if (message.topic.indexOf('magnet') > -1) {
            return new MagnetDevice(message.topic, message.payload.toString())
        } else if (message.topic.indexOf('thermostat') > -1 && !message.topic.endsWith('temp')) {
            return new ThermostatDevice(message.topic, message.payload.toString())
        }

        return new Device(message.topic, message.payload.toString())
    }
}
