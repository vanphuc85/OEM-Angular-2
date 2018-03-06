import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HeaderinputService } from './../headerinput.service';
import { OemService } from '../service/oemservice.service';
import { BasePage } from '../base-page';
import { DataService } from '../data.service';
import { HierarchyService } from '../hierarchy.service';
import { HeaderserviceService } from '../headerservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '../alert.service';
import { Alert } from '../vo/alert';
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"
import { SerializationHelper } from 'app/serialization-helper';
import { AlertCondition } from 'app/vo/alert-condition';
import { AlertSender } from 'app/vo/alert-sender';
import { localeData, locales } from 'moment';
import { GetData } from 'app/dashboard-detail/get-data';
import { DataBean } from 'app/data-bean';



@Component({
  selector: 'app-alert-edit',
  templateUrl: './alert-edit.component.html',
  styleUrls: ['./alert-edit.component.css'],
  encapsulation: ViewEncapsulation.None // <------

})
export class AlertEditComponent extends BasePage implements OnInit {

  private _options: Array<any> = Array<any>();

  private _alert: Alert = new Alert();

  private alertId: number;

  public isActivePopUp: boolean = false;

  public isActiveAlertBox: boolean = false;

  public message: string;



  set options(_options: Array<any>) {
    this._options = _options;
  }
  get options() {
    return this._options;
  }

  set alert(_alert: Alert) {
    this._alert = _alert;
  }
  get alert() {
    return this._alert;
  }



  constructor(
    private oemService: OemService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService,
    private headerService: HeaderserviceService,
    private alertService: AlertService) {
    super(_dataService, router);
    this.validateSession();
  }

  ngOnInit() {
    this.initStatic();
    this.alertId = parseFloat(this.route.snapshot.params['alertId']);
    let tempAlertSender = JSON.parse(localStorage.getItem(String(this.alertId)));
    let alertJson  =  localStorage.getItem("alert");
    if(alertJson == null  || alertJson == undefined){
      this.alertService.getAlertById(this.alertId).subscribe(
        data => {
          this._alert = Object.assign(new Alert(), JSON.parse(JSON.stringify(data)));
          if (tempAlertSender != null) {
            let alertSenders = Object.assign(Array<AlertSender>(), tempAlertSender);
            this._alert.alertSenders = alertSenders;
          }
        }
      );
    }else{
      this._alert = Object.assign(new Alert(), JSON.parse(alertJson));
    }
    localStorage.removeItem("alert");
  }

  saveAlert() {
    if (this._alert._ignore == 0) {
      this.message = "Please turn off alert before updating! Click 'OK' to turn off and update alert.";
      this.isActivePopUp = true;
      return;
    }
    if (this._alert.validate() !== "") {
      this.message = this._alert.validate();
      this.isActiveAlertBox = true;
      return;
    }
    this.oemService.updateAlert(this._alert).subscribe(
      data => {
        localStorage.removeItem(String(this.alertId));
        this.router.navigate(['set-alert']);
      }
    );
  }
  initStatic() {
    this._options = [
      { "name": ">", value: 1 },
      { "name": "<", value: 2 },
      { "name": "!=", value: 3 },
      { "name": "=", value: 4 }
    ]
  }
  selectContact() {
    localStorage.setItem("alert", JSON.stringify(this._alert));
    this.router.navigate(['select-contact', this.alertId]);
  }
  ngOnDestroy() {

  }
  changeStatus() {
    if (this._alert.ignore == 1) {
      this._alert.ignore = 0;
    } else {
      this._alert.ignore = 1;
    }
    this.oemService.updateAlert(this._alert).subscribe();
  }
  cancel() {
    this.router.navigate(['set-alert']);
  }

  confirmSave(confirm: boolean) {
    this.isActivePopUp = false;
    if (confirm) {
      this._alert.ignore = 1;
      this.oemService.updateAlert(this._alert).subscribe(
        data => {
          this.router.navigate(['set-alert']);
        }
      );
    }
  }
  alertBox(confirm: boolean) {
    this.isActiveAlertBox = false;
  }


}
