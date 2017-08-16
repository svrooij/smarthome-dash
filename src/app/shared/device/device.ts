import { MqttMessage } from 'ngx-mqtt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class Device {
    private payloadSubject: BehaviorSubject<any>;

    // Creating a device from a mqtt message
    static fromMessage (message: MqttMessage): Device {
        let kind = 'generic';
        if (message.topic.indexOf('magnet') > -1) {
            kind = 'magnet';
        }

        const device =  new Device(message.topic, kind, Device.parsePayload(message.payload.toString()));
        console.log('Device created ', device);
        return device;
    }

    // Used to parse the payload
    static parsePayload (payload: string): any {
        try {
            const parsed = JSON.parse(payload);
            return parsed;
        } catch (e) {
            return payload;
        }
    }

    constructor(
        public topic: string,
        public kind: string = 'generic',
        private _payload: any
    ) {
        this.payloadSubject = new BehaviorSubject(this.payload);
    }

    public updatePayload(payload: string) {
        this._payload = Device.parsePayload(payload);
        this.payloadSubject.next(this.payload);
    }

    public get Payload(): Observable<any> {
        return this.payloadSubject.asObservable();
    }

    public get payload(): any {
        return this._payload;
    }

    public get iconClass(): string {
        switch (this.kind) {
            case 'magnet':
                if (this.payload.val === 'closed') { return 'ti-lock'; }
                return 'ti-unlock';
            default:
                return 'ti-more';

        }
    }

    public get iconColor(): string {
        switch (this.kind) {
            case 'magnet':
                if (this.payload.val === 'closed') { return 'icon-success'; }
                return 'icon-danger';
            default :
                return 'icon-default';

        }
    }

    public get lastChange(): Date {
        // Either take lc (last change) or ts (timestamp)
        const lc = this.payload.lc || this.payload.ts;
        if (lc) { return new Date(lc); }
        return undefined;
    }

    public get lastChangeString(): string {
        const lc = this.lastChange;
        if (lc) {
            return `${lc.toLocaleDateString()} ${lc.toLocaleTimeString()}`;
        }
        return 'No clue';
    }

    public get name(): string {
        if (this.payload && this.payload.name) {
            return this.payload.name;
        }
        return this.topic.substr(this.topic.lastIndexOf('/'));
    }

}
