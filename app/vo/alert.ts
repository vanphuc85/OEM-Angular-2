import { AlertCondition } from './alert-condition';
import { AlertSender } from './alert-sender';
import { SerializationHelper } from '../serialization-helper';
import { Condition } from './condition';
import { retry } from 'rxjs/operator/retry';
import { isNumber } from 'util';


export class Alert {
    private _id: number = -1;
    private _alertName: string = "";
    _startDate: number = new Date().getTime();
    _endDate: number;
    _triggerDate: Date;
    _totalize: number;
    _actual: number;
    _maxSet: number;
    _maxValue: number;
    _minSet: number;
    _minValue: number;
    _dataName: string;
    _units: string;
    _nodeName: string;
    _displayName: string;
    _ignore: number = 0;
    _message: string;
    _notification: string;
    _dirty: boolean;
    _type: string;
    _showAlertPopup: boolean;
    _threshold: number;
    _duration: number;
    _userAlertStatus: number;
    _persistent: boolean;
    _normalize: boolean;
    private _alertConditions: Array<AlertCondition>;
    watchNodesOnControls: Array<any>;
    watchNodesOffControls: Array<any>;
    private _alertSenders: Array<AlertSender>;
    _recurrenceFrom: string = "Minute=0;Hour=0;DayOfWeek=-1;DayOfMonth=-1;Month=-1;Year=-1";
    _recurrenceTo: string = "Minute=0;Hour=24;DayOfWeek=-1;DayOfMonth=-1;Month=-1;Year=-1";
    _condition: string;
    _includeAssetInfo: boolean;
    _occurrenceCount: number;
    _occurrenceCountCurrent: number;
    convertConditionToView() {
        let result = "";
        
        if(this._alertConditions != null && this._alertConditions.length == 1){
            result = this._alertConditions[0].convertAllOneCondition();
            return result ;
        }
        for (let item of this._alertConditions) {
            result += item.convertAll() + " ";
        }
        return result;
    }
    set alertConditions(_alertConditions) {
        let temp = Array<AlertCondition>();
        for (let item of _alertConditions) {
            temp.push(Object.assign(new AlertCondition(item), JSON.parse(JSON.stringify(item))));
        }
        this._alertConditions = temp;

    }
    get alertConditions() {
        return this._alertConditions;
    }
    set alertSenders(_alertSenders) {
        let temp = Array<AlertSender>();
        for (let item of _alertSenders) {
            let sender = Object.assign(new AlertSender(), JSON.parse(JSON.stringify(item)));
            temp.push(sender);
        }
        this._alertSenders = temp;
    }
    get alertSenders() {
        return this._alertSenders;
    }

    public getReceipient() {
        let result = "";
        if (this._alertSenders == null || this._alertSenders.length == 0) {
            return "";
        }
        if (this._alertSenders.length == 1) {
            return this._alertSenders[0].receipient;
        }
        for (let i = 0; i < this._alertSenders.length; i++) {
            if(result.length > 0){
                let tempArray : Array<string> = result.split(",");
                let match : boolean = false ;
                
                for(let sender of tempArray){
                    if(sender.trim() == this.alertSenders[i].receipient.trim()){
                        match = true ;
                        break ;
                    }
                }
                if(match){
                    if(i == this._alertSenders.length -1){
                        let lastIndex = result.lastIndexOf(",");
                        result = result.substr(0,lastIndex);
                    }
                    continue ;
                }
            }
            if (i == this._alertSenders.length - 1) {
                result += this._alertSenders[i].receipient;
            } else {
                result += this._alertSenders[i].receipient + " , ";
            }
        }
        return result;
    }
    set id(_id) {
        this._id = _id;
    }
    get id() {
        return this._id;
    }
    set message(_message) {
        this._message = _message;
    }
    get message() {
        return this._message;
    }
    set alertName(_alertName) {
        this._alertName = _alertName;
    }
    get alertName() {
        return this._alertName;
    }
    set startDate(_startDate) {
        this._startDate = _startDate;
    }
    get startDate() {
        return this._startDate;
    }
    set endDate(_endDate) {
        this._endDate = _endDate;
    }
    get endDate() {
        return this._endDate;
    }
    set triggerDate(_triggerDate) {
        this._triggerDate = _triggerDate;
    }
    get triggerDate() {
        return this._triggerDate;
    }
    set totalize(_totalize) {
        this._totalize = _totalize;
    }
    get totalize() {
        return this._totalize;
    }
    set actual(_actual) {
        this._actual = _actual;
    }
    get actual() {
        return this._actual;
    }
    set maxSet(_maxSet) {
        this._maxSet = _maxSet;
    }
    get maxSet() {
        return this._maxSet;
    }
    set maxValue(_maxValue) {
        this._maxValue = _maxValue;
    }
    get maxValue() {
        return this._maxValue;
    }

    set minSet(_minSet) {
        this._minSet = _minSet;
    }
    get minSet() {
        return this._minSet;
    }
    set minValue(_minValue) {
        this._minValue = _minValue;
    }
    get minValue() {
        return this._minValue;
    }
    set dataName(_dataName) {
        this._dataName = _dataName;
    }
    get dataName() {
        return this._dataName;
    }
    set units(_units) {
        this._units = _units;
    }
    get units() {
        return this._units;
    }
    set nodeName(_nodeName) {
        this._nodeName = _nodeName;
    }
    get nodeName() {
        return this._nodeName;
    }
    set displayName(_displayName) {
        this._displayName = _displayName;
    }
    get displayName() {
        return this._displayName;
    }
    set ignore(_ignore) {
        this._ignore = _ignore;
    }
    get ignore() {
        return this._ignore;
    }
    set notification(_notification) {
        this._notification = _notification;
    }
    get notification() {
        return this._notification;
    }
    set dirty(_dirty) {
        this._dirty = _dirty;
    }
    get dirty() {
        return this._dirty;
    }
    set type(_type) {
        this._type = _type;
    }
    get type() {
        return this._type;
    }
    set showAlertPopup(_showAlertPopup) {
        this._showAlertPopup = _showAlertPopup;
    }
    get showAlertPopup() {
        return this._showAlertPopup;
    }
    set threshold(_threshold) {
        this._threshold = _threshold;
    }
    get threshold() {
        return this._threshold;
    }
    set duration(_duration) {
        this._duration = _duration;
    }
    get duration() {
        return this._duration;
    }
    set userAlertStatus(_userAlertStatus) {
        this._userAlertStatus = _userAlertStatus;
    }
    get userAlertStatus() {
        return this._userAlertStatus;
    }
    set persistent(_persistent) {
        this._persistent = _persistent;
    }
    get persistent() {
        return this._persistent;
    }
    set normalize(_normalize) {
        this._normalize = _normalize;
    }
    get normalize() {
        return this._normalize;
    }
    set recurrenceFrom(_recurrenceFrom) {
        this._recurrenceFrom = _recurrenceFrom;
    }
    get recurrenceFrom() {
        return this._recurrenceFrom;
    }
    set recurrenceTo(_recurrenceTo) {
        this._recurrenceTo = _recurrenceTo;
    }
    get recurrenceTo() {
        return this._recurrenceTo;
    }
    set condition(_condition) {
        this._condition = _condition;
    }
    get condition() {
        return this._condition;
    }
    set includeAssetInfo(_includeAssetInfo) {
        this._includeAssetInfo = _includeAssetInfo;
    }
    get includeAssetInfo() {
        return this._includeAssetInfo;
    }
    set occurrenceCount(_occurrenceCount) {
        this._occurrenceCount = _occurrenceCount;
    }
    get occurrenceCount() {
        return this._occurrenceCount;
    }
    set occurrenceCountCurrent(_occurrenceCountCurrent) {
        this._occurrenceCountCurrent = _occurrenceCountCurrent;
    }
    get occurrenceCountCurrent() {
        return this._occurrenceCountCurrent;
    }

    toJSON() {
        return {
            id: this._id,
            alertName: this._alertName,
            startDate: this._startDate,
            endDate: this._endDate,
            triggerDate: this._triggerDate,
            totalize: this._totalize,
            actual: this._actual,
            maxSet: this._maxSet,
            maxValue: this._maxValue,
            minSet: this._minSet,
            minValue: this._minValue,
            dataName: this._dataName,
            units: this._units,
            nodeName: this._nodeName,
            displayName: this._displayName,
            ignore: this._ignore,
            message: this._message,
            notification: this._notification,
            dirty: this._dirty,
            type: this._type,
            showAlertPopup: this._showAlertPopup,
            threshold: this._threshold,
            duration: this._duration,
            userAlertStatus: this._userAlertStatus,
            persistent: this._persistent,
            normalize: this._normalize,
            alertConditions: this._alertConditions,
            watchNodesOnControls: this.watchNodesOnControls,
            watchNodesOffControls: this.watchNodesOffControls,
            alertSenders: this._alertSenders,
            recurrenceFrom: this._recurrenceFrom,

            recurrenceTo: this._recurrenceTo,
            condition: this._condition,
            includeAssetInfo: this._includeAssetInfo,
            occurrenceCount: this._occurrenceCount,
            occurrenceCountCurrent: this._occurrenceCountCurrent
        };
    }
    validate() {
        if (this._alertName == "") {
            return "Please fill in alert name.";
        }
        let measureValue: string = String(this._alertConditions[0].measureValue);
        if (measureValue == "" || isNaN(parseInt(measureValue))) {
            return "At least one condition needed.";
        }
        if (this._alertSenders == null || this._alertSenders.length == 0) {
            return "At least one contact needed.";
        }
        return "";
    }
}
