import { Timestamp } from "app/timestamp";
import * as moment from 'moment';


export class EventLogs {
    _logValue: string;
    logType: string;
    timestamp: number;
    dateString: string;
    ownerGroup: number;
    username: string;
    link: string;

    convertTimeStamp(){
        var t = new Date(this.timestamp);
        let date = moment(t).local().format("YYYY-MM-DD HH:mm");
        return date ;
    }

    set logValue(_logValue : string){
        this._logValue = _logValue;
    }
    get logValue(){
        let temp = this._logValue.replace("Fault","");
        return temp ;
    }
}
