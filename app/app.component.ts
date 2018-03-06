import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OemService } from './service/oemservice.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  hamvisibility: string = "visible";
  loginSuccess: boolean = true


  constructor(private _dataService: DataService, private oemService: OemService, private router: Router) {
  }
  ngOnInit() {
    this.subscription = this._dataService.loginItem$
      .subscribe(login => {
        this.loginSuccess = login;
        this.hamvisibility = login == true ? "visible" : "hidden";
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
