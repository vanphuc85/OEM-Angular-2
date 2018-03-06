import { Component, OnInit,Renderer,ViewChild ,ElementRef} from '@angular/core';
import { HeaderbigService } from './../../headerbig.service';

import { DataService } from './../../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from './../../service/oemservice.service';
import { BasePage } from './../../base-page';
import { ContactVo } from './../../vo/contact-vo';
import { Notification } from './../../vo/notification';

import { ContactService } from './../../contact.service';
import { Country } from './../../vo/country';
import { Contact } from './../../vo/contact';




@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent extends BasePage implements OnInit {

  name = '';
  text = '';
  measure = '';
  fullImagePath = './assets/image/contacts-b.svg';

  private userName: string;

  public contactVo: ContactVo;

  contact: Contact;

  public isActiveAlertBox : boolean = false ;

  public message : string ;

  @ViewChild("phone") phone : ElementRef ;

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private headerBigService: HeaderbigService,
    private contactService: ContactService,
    private renderer: Renderer
  ) {
    super(_dataService, router);
    this.validateSession();
    headerBigService.name = 'Edit Contact';
    headerBigService.text = '';
    headerBigService.measure = '';
    headerBigService.fullImagePath = './assets/image/contacts-b.svg';
  }

  ngOnInit() {
    this.userName = this.route.snapshot.params['userName'];
    this.contactService.findContactByName(this.userName).subscribe(data =>{
      this.contactVo = data ;
      if(data.image == null){
        this.contactVo.image = "./assets/image/contacts-b.svg"
      }
    });
    this.renderer.listen(this.phone.nativeElement, "focus",(event) =>{
        this.phone.nativeElement.removeAttribute("");
    });
  }

  save() {
    
    let notification =  this.contactService.findContryByName(this.userName) ;
    let country: Country = notification.country;
    this.contact = new Contact();
    this.contact.country = country;
    this.contact.emailArgument = "to=" + this.contactVo.email;
    this.contact.name = this.contactVo.userName;
    this.contact.phoneArgument = "to=" + this.contactVo.phone;
    this.contact.image = notification.image;
    this.oemSevice.updateContact(this.contact).subscribe(data => {
    
      if(data && data.data && data.data.errorBean && data.data.errorBean.data && data.data.errorBean.data[0]){
        this.message =  data.data.errorBean.data[0].value ;
        this.isActiveAlertBox = true ;
        return ;
      }
    
      this.router.navigate(['/contacts']);
    });

  }
  checkValue(event) {

  }
  cancel(){
    this.router.navigate(['contacts']);
  }
  alertBox(ok :boolean){
    this.isActiveAlertBox = false ;
  }
}
