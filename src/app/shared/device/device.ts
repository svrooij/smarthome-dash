import { MqttMessage } from 'ngx-mqtt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class Device {
    private payloadSubject: BehaviorSubject<any>;
    private _payload: string

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
        payload: string,
        public kind: string = 'generic',

    ) {
        this._payload = Device.parsePayload(payload)
        this.payloadSubject = new BehaviorSubject(this._payload);
    }

    public updatePayload(payload: string) {
        this._payload = Device.parsePayload(payload);
        this.payloadSubject.next(this._payload);
    }

    public get Payload(): Observable<any> {
        return this.payloadSubject.asObservable();
    }

    public get payload(): any {
        return this._payload;
    }

    public get iconClass(): string {
        return 'ti-more';
    }

    public get iconColor(): string {
        return 'icon-default';
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
        return this.topic.substr(this.topic.lastIndexOf('/') + 1);
    }

}
