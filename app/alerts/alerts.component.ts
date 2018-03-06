import { Component, OnInit } from '@angular/core';
import { HeaderserviceService } from './../headerservice.service';
import { BasePage } from './../base-page';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import {HostListener} from '@angular/core';



@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent extends BasePage implements OnInit {

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private headerservice: HeaderserviceService  ) {
    
    super(_dataService, router);
    this.validateSession();
    this.headerservice.name = 'Alerts';
  }

  ngOnInit() {
  }
  goToSetAlert() {
    this.router.navigate(['/set-alert']);
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if(event.keyCode == 13){
      
    }
  }
  ngOnDestroy(){
    
  }
  goToHistoryAlert(){
    this.router.navigate(['/history-alert']);
  }
}
