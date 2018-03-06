export class AlertSender {
    sid: number;
    receipient: string;
    notificationType: string;
 
    constructor(alertSender?: AlertSender) {
        if (alertSender) {
            this.sid = alertSender.sid;
            this.receipient = alertSender.receipient;
            this.notificationType = alertSender.notificationType;
        }
    }
}
