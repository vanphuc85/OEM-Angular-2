import { Component, OnInit, HostListener, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HeaderserviceService } from './../headerservice.service';
import { DOCUMENT } from '@angular/platform-browser';
import { TimeoutComponent } from './../timeout/timeout.component';
import { Menu } from 'app/menu';
import * as globals from 'app/globals';
import { Input } from '@angular/core/src/metadata/directives';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  public name: string;

  private IDLE_TIMEOUT: number = 15; //seconds

  private static _idleSecondsCounter: number = 0;

  private _isActive: boolean;

  public menuList: Array<Menu>;

  set isActive(_timeOut: boolean) {
    this._isActive = _timeOut;
  }
  get isActive() {
    return this._isActive;
  }



  constructor(private headerservice: HeaderserviceService,
    @Inject(DOCUMENT) private document: any) {
    this.name = headerservice.name;

    HeaderComponent._idleSecondsCounter = 0;
    window.setInterval(() => {
      HeaderComponent._idleSecondsCounter++;
      if (HeaderComponent._idleSecondsCounter >= this.IDLE_TIMEOUT) {
        this._isActive = true;
      }
    }, 1000);
  }

  ngOnInit() {
    this.menuList = Object.assign(Array<Menu>(), JSON.parse(localStorage.getItem("menu")));
    let mode = localStorage.getItem("mode");
    let temp : Array<Menu>= Array<Menu>();
    debugger
    for(let item of this.menuList){
      if(mode == "Device"){
        if(item.name != "hierarchy"){
          temp.push(item);
        }
      }else if(mode == "Hierarchy"){
        if(item.name != "device"){
          temp.push(item);
        }
      }
    }
    this.menuList = temp ;
  }

  isCollapsed: boolean = false;
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    HeaderComponent._idleSecondsCounter = 0;
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    HeaderComponent._idleSecondsCounter = 0;
  }
  @HostListener('keypress', ['$event'])
  onKeyPress(event: MouseEvent) {
    HeaderComponent._idleSecondsCounter = 0;
  }

  changeStatus(exit: boolean) {
    if (exit == true) {
      this._isActive = false;
    }
  }
  routing(menu: Menu) {
    // reset focus into device tab after click logout
    
    if (menu.name == "login") {
      for (let item of this.menuList) {
        if (item.name == "device"  || item.name == "hierarchy") {
          item.active = true;
        } else {
          item.active = false;
        }
      }
      return;
    }
    // general case for 3 button device, alert, contact
    for (let item of this.menuList) {
      if (item.name == menu.name) {
        item.active = true;
      } else {
        item.active = false;
      }
    }
    localStorage.setItem("menu",JSON.stringify(this.menuList));
  }
  alertBox(ok: boolean) {

  }

}
