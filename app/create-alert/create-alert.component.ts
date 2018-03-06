import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { OemService } from '../service/oemservice.service';
import { HeaderserviceService } from '../headerservice.service';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BasePage } from '../base-page';
import { Alert } from '../vo/alert';
import { Condition } from '../vo/condition';
import { AlertCondition } from 'app/vo/alert-condition';
import { AlertSender } from 'app/vo/alert-sender';
import { DataBean } from 'app/data-bean';
import { } from '@angular/core/src/metadata/view';
import { isNumber } from 'util';


@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CreateAlertComponent extends BasePage implements OnInit {

  private _options: Array<any> = Array<any>();

  private _alert: Alert;

  private _unit: string;

  public message: string;

  public isActivePopUp: boolean = false;

  set alert(_alert: Alert) {
    this._alert = _alert;
  }
  get alert() {
    return this._alert;
  }

  set unit(_unit: string) {
    this._unit = _unit;
  }
  get unit() {
    return this._unit;
  }

  set options(_options: Array<any>) {
    this._options = _options;
  }
  get options() {
    return this._options;
  }


  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private headerservice: HeaderserviceService,
    public contactService: ContactService
  ) {
    super(_dataService, router);
    this.validateSession();
  }

  ngOnInit() {
    this.initStatic();

    if (localStorage.getItem("alert") != undefined) {
      let temp = localStorage.getItem("alert");
      this._alert = Object.assign(new Alert(), JSON.parse(temp));
      this._unit = localStorage.getItem("unit");

      if (localStorage.getItem("-1") != undefined) {
        let alertSenders = localStorage.getItem("-1");
        this._alert.alertSenders = Object.assign(Array<AlertSender>(), JSON.parse(alertSenders))
      }

    } else {
      this._alert = new Alert();
      this._unit = this.route.snapshot.params['unit'];
      this._alert.dataName = this.route.snapshot.params['dataName'];
      let alertCondition: AlertCondition = new AlertCondition();
      alertCondition.dataName = this._alert.dataName;
      alertCondition.units = this._unit;
      this._alert.alertConditions = Array<AlertCondition>(alertCondition);
      this._alert.nodeName = this.route.snapshot.params['nodeName'];
    }

  }

  saveAlert() {
    let alertConditions = this._alert.alertConditions;
    this._alert.displayName = this._alert.dataName;
    for (let alertCondition of alertConditions) {
      alertCondition.dataName = this._alert.dataName;
    }
    console.log("----start create alert----");
    console.log(this._alert);
    if (this.validateAlert()) {
      this.oemSevice.createAlert(this._alert).subscribe(
        data => {
          console.log("data ");
          console.log(data);
          if(data && data.error){
            if(data.error == "query did not return a unique result: 2"){
              this.message = "Duplicate alert name.";
              this.isActivePopUp = true ;
              return ;
            }
              
          }
          console.log("----end create alert----");
          // if (data.data.alerts != undefined) {
            localStorage.removeItem("-1");
            this.router.navigate(['set-alert']);
          // }
        }
      );
    }
  }
  changeStatus() {
    if (this._alert.ignore == 0) {
      this._alert.ignore = 1;
    } else {
      this._alert.ignore = 0;
    }
  }
  goToSelectContact() {
    let alertJson = JSON.stringify(this._alert);
    localStorage.setItem("alert", alertJson);
    localStorage.setItem("unit", this._unit);
    this.router.navigate(['select-contact', 0]);
  }
  initStatic() {
    this._options = [
      { "name": ">", value: 1 },
      { "name": "<", value: 2 },
      { "name": "!=", value: 3 },
      { "name": "=", value: 4 }
    ]
  }
  cancel() {
    this.router.navigate(['set-alert']);
  }
  confirm(yes: boolean) {
    this.isActivePopUp = false;
  }
  validateAlert(): boolean {
    if (this._alert.alertName == "") {
      this.message = "Please fill in alert name.";
      this.isActivePopUp = true;
      return false;
    }

    let measureValue: string = String(this._alert.alertConditions[0].measureValue);
    if (isNaN(parseInt(measureValue)) || measureValue == "") {
      this.message = "At least one condition needed.";
      this.isActivePopUp = true;
      return false;
    }

    if (this._alert.alertSenders == null || this._alert.alertSenders.length == 0) {
      this.message = "At least one contact needed.";
      this.isActivePopUp = true;
      return false;
    }
    return true;
  }
  receiveMessage(alertName) {
    this._alert.alertName = alertName;
  }


}
