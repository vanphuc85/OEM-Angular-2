import { AlertCondition } from "app/vo/alert-condition";

export class AlertConditionView extends AlertCondition {
    convertRelationOp_: string;
    public convertRelationOp(): string {
        if (this.relationOp == 1) {
            this.convertRelationOp_ = ">";
        }
        else if (this.relationOp == 2) {
            this.convertRelationOp_ = "<"
        }
        else if (this.relationOp == 3) {
            this.convertRelationOp_ = "!=";
        }
        else if (this.relationOp == 4) {
            this.convertRelationOp_ = "==";
        }
        return this.convertRelationOp_;
    }
    public convertLogicalOp(): string {
        let result = "";
        if (this.logicalOp == -1) {
            result = "";
        } else if (this.logicalOp == 2) {
            result = "OR"
        }
        return result;
    }
    public convertAll(): string {
        return this.convertRelationOp() + " " + this.measureValue + " " + this.units + " " + this.convertLogicalOp();
    }

}
