import { Device } from './device'

export class MagnetDevice extends Device {
    constructor(
        public topic: string,
        payload: string
    ) {
        super(topic, payload, 'magnet')
    }

    public get iconColor(): string {
        if (this.payload.val === 'closed') { return 'icon-success'; }
        return 'icon-danger';
    }

    public get iconClass(): string {
        if (this.payload.val === 'closed') { return 'ti-lock'; }
        return 'ti-unlock';
    }
}
