import { Component, OnInit } from '@angular/core';
import { HeaderserviceService } from './../headerservice.service';

import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { BasePage } from './../base-page';
import { ContactVo } from './../vo/contact-vo';
import { Notification } from './../vo/notification';
import { ContactService } from './../contact.service';
import { exists } from 'fs';
import { debuglog } from 'util';




@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends BasePage implements OnInit {
  name = 'Contacts';

  private _contacts : Array<ContactVo> = Array<ContactVo>();

  public isActive : boolean = false ;

  public isActiveAlertBox : boolean = false ;

  private nameDelete : string ;

  public message  : string ;

  set contacts(_contacts){
    this._contacts = _contacts;
  }
  get contacts(){
    return this._contacts;
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
    headerservice.name = 'Contacts';
  }

  ngOnInit() {
    this.contactService.getAllContacts().subscribe(
      data =>{
        this._contacts = data ;
        
      }
    );
  }

  delete(userName) {
    this.isActive = true ;
    this.nameDelete = userName ;
    this.message = "Do you want to delete "+ userName + " ? ";
  }
  changeStatus(yes: boolean){
    this.isActive = false ;
    if(yes){
      
      this.contactService.delete(this.nameDelete).subscribe(
        data => {
          if(data && data.data && data.data.errorBean && data.data.errorBean.data && data.data.errorBean.data[0]){
            if(data.data.errorBean.data[0].value == "Cannot delete Contact. Make sure its not associated with any alerts before deleting.") {
              this.message = "Contact being used in existing alert(s) and cannot be deleted.";
            }  
            else{
              this.message = data.data.errorBean.data[0].value ;
            }
            this.isActiveAlertBox = true ;
            return ;
          }
          this.contactService.getAllContacts().subscribe();
        }
      );
    }
    this.contactService.getAllContacts().subscribe();
  }
  alertBox(ok : boolean){
    this.isActiveAlertBox = false ;
  }
}
