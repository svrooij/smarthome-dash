export class MqttSettings {
    constructor (
        public port: number,
        public hostname: string,
        public protocol: 'wss' | 'ws',
        public username?: string,
        public password?: string,
        public fromSettings: boolean = false
     ) { }

    static fromJson(json:string){
        let obj = JSON.parse(json);
        return new MqttSettings(
            obj.port | 0 ,
            obj.hostname,
            obj.protocol,
            obj.username,
            obj.password,
            true);
    }

    static default(){
        return new MqttSettings (
            8080,
            "test.mosquitto.org",
            "ws"
        );
    }
}