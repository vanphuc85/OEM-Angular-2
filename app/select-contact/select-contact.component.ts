import { Component, OnInit } from '@angular/core';
import { BasePage } from 'app/base-page';
import { DataService } from 'app/data.service';
import { OemService } from 'app/service/oemservice.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from 'app/contact.service';
import { ContactVo } from 'app/vo/contact-vo';
import { AlertService } from 'app/alert.service';
import { Alert } from 'app/vo/alert';
import { AlertSender } from 'app/vo/alert-sender';
import { Contact } from 'app/vo/contact';


@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.css']
})
export class SelectContactComponent extends BasePage implements OnInit {

  private _contacts: Array<ContactVo> = Array<ContactVo>();

  private _originalAlert: Alert = new Alert();

  private _alert: Alert = new Alert();

  public isActiveAlertBox : boolean = false ;

  public message : string ;

  set contacts(_contacts) {
    this._contacts = _contacts;
  }
  get contacts() {
    return this._contacts;
  }

  set alert(_alert) {
    this._alert = _alert;
  }
  get alert() {
    return this._alert;
  }

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private contactService: ContactService,
    private alertService: AlertService
  ) {
    super(_dataService, router);
    this.validateSession();
  }

  ngOnInit() {
    let alertId = parseFloat(this.route.snapshot.params['alertId']);
    this.alertService.getAlertById(alertId).subscribe(
      data => {
        // if (data != undefined) {
        //   this._alert = Object.assign(new Alert(), JSON.parse(JSON.stringify(data)));
        // } else {
        //   this._alert = Object.assign(new Alert(), JSON.parse(sessionStorage.getItem("alert")));
        // }
        this._alert = Object.assign(new Alert(), JSON.parse(localStorage.getItem("alert")));
        let alertSenders = this._alert.alertSenders;
        
        if (alertSenders == null || alertSenders.length == 0) {
          if (data != undefined) {
            this._alert = Object.assign(new Alert(), JSON.parse(JSON.stringify(data)));
            alertSenders = this._alert.alertSenders;
          }
        }
        this._originalAlert = this._alert ;

        this.contactService.getAllContacts().subscribe(
          data => {
            this._contacts = data;
            // let alertSenders = this._alert.alertSenders;
            for (let contact of this._contacts) {
              let match: boolean = false;
              for (let sender of alertSenders) {
                if (contact.userName == sender.receipient) {
                  if (sender.notificationType == "email") {
                    contact.activeEmail = true;
                  }
                  else {
                    contact.activePhone = true;
                  }
                }
              }
            }
          }
        );
      }
    );
  }
  contact(contactVo: ContactVo, typeConact: string) {
    for (let item of this._contacts) {
      if (item == contactVo) {
        if (typeConact == "phone") {
          if (item.activePhone == true) {
            item.activePhone = false;
          }
          else {
            item.activePhone = true;
          }
        } else {
          if (item.activeEmail == true) {
            item.activeEmail = false;
          }
          else {
            item.activeEmail = true;
          }
        }
      }
    }
  }
  saveAlertSender() {
    this._alert.alertSenders = [];
    for (let contact of this._contacts) {
      if (contact.activeEmail == true) {
        let alertSender = new AlertSender();
        alertSender.notificationType = "email";
        alertSender.receipient = contact.userName;
        this._alert.alertSenders.push(alertSender);
      }
      if (contact.activePhone == true) {
        let alertSender = new AlertSender();
        alertSender.notificationType = "sms";
        alertSender.receipient = contact.userName;
        this._alert.alertSenders.push(alertSender);
      }
    }
    if(this._alert.alertSenders == null || this._alert.alertSenders.length ==0){
      this.message = "At least one contact needed." ;
      this.isActiveAlertBox = true ;
      return ;
    }
    localStorage.removeItem(String(this._alert.id));
    localStorage.setItem(String(this._alert.id), JSON.stringify(this._alert.alertSenders));
    localStorage.setItem("alert", JSON.stringify(this._alert));
    if (this._alert.id == -1) {
      this.router.navigate(['create-alert']);
    } else {
      this.router.navigate(['alert-edit', this._alert.id]);
    }
  }
  cancel() {
    // localStorage.setItem(String(this._alert.id), JSON.stringify(this._originalAlert.alertSenders));
    // localStorage.setItem("alert", JSON.stringify(this._originalAlert));
    if (this._alert.id == -1) {
      this.router.navigate(['create-alert']);
    } else {
      this.router.navigate(['alert-edit', this._alert.id]);
    }
  }
  alertBox(ok :boolean){
    this.isActiveAlertBox = false ;
  }
}
