import { AlertCondition } from "app/vo/alert-condition";
import { AlertSender } from "app/vo/alert-sender";

export interface AlertInterface {
    id: number;
    alertName: string;
    startDate: Date;
    endDate: Date;
    triggerDate: Date;
    totalize: number;
    actual: number;
    maxSet: number;
    maxValue: number;
    minSet: number;
    minValue: number;
    dataName: string;
    units: string;
    nodeName: string;
    displayName: string;
    ignore: number;
    message: string;
    notification: string;
    dirty: boolean;
    type: string;
    showAlertPopup: boolean;
    threshold: number;
    duration: number;
    userAlertStatus: number;
    persistent: boolean;
    normalize: boolean;
    alertConditions: Array<AlertCondition>;
    watchNodesOnControls: Array<any>;
    watchNodesOffControls: Array<any>;
    alertSenders: Array<AlertSender>;
    recurrenceFrom: string;
    recurrenceTo: string;
    condition: string;
    includeAssetInfo: boolean;
    occurrenceCount: number;
    occurrenceCountCurrent: number;
}
