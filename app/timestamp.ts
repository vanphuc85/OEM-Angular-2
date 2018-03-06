import * as moment from 'moment';

export class Timestamp {
    time: number;
    timezone: string;

    convertTime(type: string): string {
        let result = "";
        switch (type) {
            case "m": {
                result = moment(new Date(this.time)).format("HH:mm A");
                break;
            }
            case "H": {
                result = moment(new Date(this.time)).format('hh:mm A');
                break;
            }
            case "D": {
                result = moment(new Date(this.time)).format('DD-MMM-YYYY');
                break;
            }
            case "M": {
                result = moment(new Date(this.time)).format('MM-YYYY');
                break;
            }
            case "Y": {
                result = moment(new Date(this.time)).format('YYYY');
                break;
            }
        }
        return result;
    }
}
