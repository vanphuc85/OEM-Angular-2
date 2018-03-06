export class Condition {
    relationOp: number;
    measureValue: number;
    logicalOp: number;
    dataName: number;
    conditionIndex: number;
    id: number;
    units: string;

    convertRelationOp(): string {
        let result = "";
        if (this.relationOp == 1) {
            result = ">";
        }
        else if (this.relationOp == 2) {
            result = "<"
        }
        else if (this.relationOp == 3) {
            result = "!=";
        }
        else if (this.relationOp == 4) {
            result = "==";
        }
        return result;
    }
    convertLogicalOp(): string {
        let result = "";
        if (this.logicalOp == -1) {
            result = "";
        }
        else if (this.logicalOp == 1) {
            result = "AND"
        }
        else if (this.logicalOp == 2) {
            result = "OR"
        }
        
        return result;
    }
    convertAll(): string {
        return  this.convertRelationOp() + " " + this.measureValue + " " + this.units + " " + this.convertLogicalOp();
    }
}
