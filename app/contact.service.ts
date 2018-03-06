import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { OemService } from './service/oemservice.service';
import { BasePage } from './base-page';
import { ContactVo } from './vo/contact-vo';
import { Notification } from './vo/notification';
import { Contact } from './vo/contact';
import { Observable } from 'rxjs/Observable';






@Injectable()
export class ContactService extends BasePage {
  private _notification: Array<Notification> = Array<Notification>();

  private _contacts: Array<ContactVo>;

  set contacts(_contacts: Array<ContactVo>) {
    this._contacts = _contacts;
  }

  get contacts() {
    return this._contacts;
  }

  set notification(_notification: Array<Notification>) {
    this._notification = _notification;
  }
  get notification() {
    return this._notification;
  }

  constructor(protected _dataService: DataService,
    protected router: Router,
    protected oemSevice: OemService) {
    super(_dataService, router);
    this.validateSession();
    this.getAllContacts().subscribe();
  }



  getAllContacts(): Observable<Array<ContactVo>> {
    this._contacts = Array<ContactVo>();
    return this.oemSevice.getAllContacts("")
      .map(data => {
        this._notification = data.data.notifications;
        for (let i = 0; i < this._notification.length; i++) {
          for (let j = this._notification.length - 1; j >= 0; j--) {
            if (i == j) {
              break;
            }

            if (this._notification[i].name == this._notification[j].name) {
              let contactVo: ContactVo = new ContactVo();
              contactVo.userName = this._notification[i].name;
              if (this._notification[i].type == "sms") {
                contactVo.phone = this._notification[i].arguments.replace(/^\D+/g, '');
                contactVo.email = this._notification[j].arguments.substring(3, this._notification[j].arguments.length);

              }
              else if (this._notification[j].type == "email") {
                contactVo.phone = this._notification[j].arguments.replace(/^\D+/g, '');
                contactVo.email = this._notification[i].arguments.substring(3, this._notification[i].arguments.length);
              }
              contactVo.image = this._notification[j].image ;
              let temp = this._contacts.filter(item => {
                if (item.userName == contactVo.userName) {
                  if(contactVo.image == null && item.image != null){
                    contactVo.image = item.image ;
                  }
                  return item;
                }
              });
              if (temp == null || temp.length == 0) {
                this._contacts.push(contactVo);
              }
              
            }
          }
        }
        
        return this._contacts;
      });
  }

  delete(contactName: string) {
    return this.oemSevice.deleteContact(contactName);
  }

  create(contact: Contact)  {
    return this.oemSevice.createContact(contact);
  }
  findContactByName(userName: string): Observable<ContactVo> {
    return this.getAllContacts().map(data => {
      let result: Array<ContactVo> = Array<ContactVo>()
      if (this._contacts == null || this._contacts.length == 0) {
        return new ContactVo();
      }
      result = this._contacts.filter((item) => {
        if (item.userName == userName) {
          return item;
        }
      });
      return result[0];
    });

  }

  findContryByName(userName: string) {
    for (let item of this._notification) {
      if (userName == item.name) {
        return item;
      }
    }
  }

}
