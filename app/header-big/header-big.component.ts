import { Component, OnInit, Input } from '@angular/core';
import { HeaderbigService } from './../headerbig.service';
import { Menu } from 'app/menu';
import * as globals from 'app/globals';


@Component({
  selector: 'app-header-big',
  templateUrl: './header-big.component.html',
  styleUrls: ['./header-big.component.css']
})
export class HeaderBigComponent implements OnInit {

  public _name: string;

  public _image: string;

  public menuList: Array<Menu>;

  public active: boolean = true;

  public _condition: string = "";

  public _dataName: string;

  @Input() set image(_image: string) {
    this._image = _image;
  }
  get image() {
    return this._image;
  }
  @Input() set name(_name: string) {
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
    debugger
    this.menuList = temp ;
    this._name = _name;
  }
  get name() {
    return this._name;
  }

  @Input() set condition(_condition) {
    this._condition = _condition;
  }
  get condition() {
    return this._condition;
  }

  @Input() set dataName(_dataName) {
    this._dataName = _dataName;
  }
  get dataName() {
    return this._dataName;
  }

  constructor(private headerbig: HeaderbigService) {
    this.menuList = globals.menuList;
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
    debugger
    this.menuList = temp ;
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
  hide(){
    if(this.active == true){
      this.active = false ;
    }else{
      this.active = true ;
    }
  }
  alertBox(ok: boolean) {

  }
  

}
