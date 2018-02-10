import { Device } from './device'

export class ThermostatDevice extends Device {
    constructor(
        public topic: string,
        payload: string
    ) {
        super(topic, payload, 'thermostat')
    }

    public get iconClass(): string {
        return 'ti-stats-up'
    }
}
