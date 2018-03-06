import { Condition } from './condition';
import { SerializationHelper } from '../serialization-helper';
export class Watche {
    nodeName: string;
    ignoreAlert: number;
    triggerDate: Date;
    displayName: string;
    units: string;
    showAlertPopUp: boolean;
    includeAssetInfo: boolean;
    recurrenceTo: string;
    conditionList: Condition[];
    watchId: number;
    watchName: string;
    recurrenceFrom: string;
    dataname: string;
    startDate: Date;

    convertConditionToView(){
        let result = "";
        for(let item of this.conditionList){
            let condition = SerializationHelper.toInstance(new Condition(), JSON.stringify(item));
            result += condition.convertAll() + " ";
        }
        return result;
    }
}
