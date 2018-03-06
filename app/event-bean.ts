import { DataBean } from './data-bean';
import { Timestamp } from './timestamp';


export class EventBean {

    public ID: number;
    public name: string;
    private _timestamp: Timestamp;
    public state: number;
    public type: number;
    public CIName: string;
    public CIExternalID: string;
    public data: any[];
    public datetime: Date;
    public nodeDisplayName: string;
    private _dataBean: DataBean[];

    set timestamp(_timestamp) {
        this._timestamp = Object.assign(new Timestamp(), _timestamp);
    }
    get timestamp() {
        return this._timestamp;
    }

    set dataBean(_dataBean) {
        let temp: Array<DataBean> = new Array<DataBean>();
        for (let item of _dataBean) {
            temp.push(Object.assign(new DataBean(), item));
        }
        this._dataBean = temp;
    }
    get dataBean() {
        return this._dataBean;
    }

}
