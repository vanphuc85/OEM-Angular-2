import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { BasePage } from './../../base-page';
import { DataService } from './../../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from './../../service/oemservice.service';
import { ContactService } from './../../contact.service';
import { ContactVo } from './../../vo/contact-vo';
import { Contact } from './../../vo/contact';
import { HeaderserviceService } from '../../headerservice.service';





@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent extends BasePage implements OnInit {

  public contactVo: ContactVo;

  public message: string;

  public isActiveAlertBox: boolean = false;

  @ViewChild("phone") phone: ElementRef;

  @ViewChild("email") email: ElementRef;




  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private contactService: ContactService,
    private renderer: Renderer,
    private headerService: HeaderserviceService

  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerService.name = "New Contact";
  }

  ngOnInit() {
    this.contactVo = new ContactVo();
    this.renderer.listen(this.phone.nativeElement,
      "focus", (event) => {

        this.phone.nativeElement.removeAttribute("placeholder");
      });
    this.renderer.listen(this.phone.nativeElement,
      "focus", (event) => {
        if (this.phone.nativeElement.value == "") {
          this.phone.nativeElement.setAttribute("placeholder", "65 8888 8888");
        }
      });
    this.renderer.listen(this.email.nativeElement,
      "focus", (event) => {
        if (this.email.nativeElement.value == "") {
          this.email.nativeElement.removeAttribute("placeholder");
        }
      });
  }

  save() {
    let contact = new Contact();
    contact.country = null;
    contact.emailArgument = "to=" + this.contactVo.email;
    contact.image = null;
    contact.name = this.contactVo.userName;
    contact.phoneArgument = "to=" + this.contactVo.phone;

    if(contact.name == undefined){
      this.message = "Please key in full name";
      this.isActiveAlertBox = true ;
      return ;
    }
    if(contact.phoneArgument == "to=undefined"){
      this.message = "Please key in phone number";
      this.isActiveAlertBox = true ;
      return ;
    }
    if(contact.emailArgument == undefined){
      this.message = "Please key in email";
      this.isActiveAlertBox = true ;
      return ;
    }

    this.oemSevice.createContact(contact).subscribe(
      data => {
        debugger
        if (data && data.data && data.data.errorBean && data.data.errorBean.data) {
          this.message =  data.data.errorBean.data[0].value ;
          this.isActiveAlertBox = true ;
          return ;
        }
        this.router.navigate(["/contacts"]);
      }
    );
  }
  cancel() {
    this.router.navigate(['contacts']);
  }
  alertBox(ok: boolean) {
    this.isActiveAlertBox = false;
  }


}
