import { Device } from './device'

export class PirDevice extends Device {
    constructor(
        public topic: string,
        payload: string
    ) {
        super(topic, payload, 'pir')
    }

    public get iconColor(): string {
        if (this.payload.val === 'no_motion') { return 'icon-success'; }
        return 'icon-danger';
    }

    public get iconClass(): string {
        if (this.payload.val === 'motion') { return 'fa fa-toggle-on'; }
        return 'fa fa-toggle-off';
    }
}
