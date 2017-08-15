import { MqttMessage }from 'ngx-mqtt';
import { BehaviorSubject, Observable } from 'rxjs';

export class Device {
    constructor(
        public topic: string,
        public kind: string = 'generic',
        private payload: any
    ){
        this.payloadSubject = new BehaviorSubject(this.payload);
    }

    private payloadSubject: BehaviorSubject<any>;
    public updatePayload(payload: string) {
        this.payload = Device.parsePayload(payload);
        this.payloadSubject.next(this.payload);
    }
    
    public get Payload() : Observable<any> {
        return this.payloadSubject.asObservable();
    }

    public get iconClass(): string {
        switch(this.kind){
            case 'magnet':
                if(this.payload.val === 'closed') return 'ti-lock';
                return 'ti-unlock';
            default:
                return 'ti-more';

        }
    }

    public get iconColor(): string {
        switch(this.kind){
            case 'magnet':
                if(this.payload.val === 'closed') return 'icon-success';
                return 'icon-danger';
            default:
                return 'icon-default';

        }
    }

    public get lastChange(): Date {
        // Either take lc (last change) or ts (timestamp)
        let lc = this.payload.lc || this.payload.ts;
        if(lc) return new Date(lc);
        return undefined;
    }

    public get lastChangeString(): string {
        let lc = this.lastChange;
        if(lc){
            return `${lc.toLocaleDateString()} ${lc.toLocaleTimeString()}`;
        }
        return "No clue";
    }

    public get name(): string {
        if(this.payload && this.payload.name){
            return this.payload.name;
        }
        return this.topic.substr(this.topic.lastIndexOf('/'));
    }

    static fromMessage (message: MqttMessage): Device{
        let kind = 'generic';
        if(message.topic.indexOf('magnet') > -1){
            kind = 'magnet';
        }

        let device =  new Device(message.topic,kind,Device.parsePayload(message.payload.toString()));
        console.log('Device created ',device);
        return device;
    }

    static parsePayload (payload: string): any{
        try {
            let parsed = JSON.parse(payload);
            return parsed;
        } catch (e){
            return payload;
        }
    }
}