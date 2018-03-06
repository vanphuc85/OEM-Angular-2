import { Component, OnInit } from '@angular/core';
import { OemService } from '../service/oemservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../data.service';
import { UserVO } from './../user-vo';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HostListener } from '@angular/core';
import { locales } from 'moment';
import { Node } from 'app/node';
import { HierarchyComponent } from 'app/hierarchy/hierarchy.component';
import { HierarchyService } from 'app/hierarchy.service';
import { Global, menuList } from 'app/globals';
import * as globals from 'app/globals';
import { Menu } from 'app/menu';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _userName: string;
  private _password: string;
  private _userVO: UserVO;
  private _key: string;

  private nodes: Array<Node>;

  get key() {
    return this._key;
  }
  set key(key: string) {
    this._key = key;
  }

  get userVO() {
    return this._userVO;
  }
  set userVO(userVO) {
    this._userVO = userVO;
  }

  get userName() {
    return this._userName;
  }
  set userName(_userName) {
    this._userName = _userName;
  }

  get password() {
    return this._password;
  }
  set password(_password) {
    this._password = _password;
  }

  subscription: Subscription;


  constructor(private oemService: OemService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private hierarchyService: HierarchyService
  ) {
    // localStorage.clear();
    this.dataService.key = "";
  }

  ngOnInit() {
    this.dataService.changeLogin(false);
    this.userName = Cookie.get('username');
    this.password = Cookie.get('password');


    let sessionExpired = this.route.params.subscribe(params => {
      let session = params['id'];
      if (session === 'sessionexpired') {
        setTimeout(function () {
          alert('Session expired.')
        }, 0);
      }
    });
    localStorage.removeItem(localStorage.getItem("key"));
    localStorage.removeItem("treeState");
    localStorage.removeItem("key");
    localStorage.removeItem("mode");
    localStorage.removeItem("menu");
    this.dataService.userVO = undefined;



  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.login();
    }
  }

  login() {

    this.oemService.login(this.userName, this.password)
      .subscribe(
      data => {

        this.hierarchyService.nodes = [];
        this.hierarchyService.mode = "Device";




        this.userVO = data;

        if (this.userVO.errorBean == null) {
          if (data.hasOwnProperty('username') === false || data.username === null || data.username === undefined) {
            data.username = '';
          }
          this.dataService.userVO = data;
          this.key = data.key;
          this.dataService.key = data.key;
          localStorage.setItem('key', data.key);
          localStorage.setItem('username', data.username);
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);

          let menusList = Array<Menu>();






          this.dataService.changeLogin(true);


          this.hierarchyService.getOneLevelHierarChy(0).subscribe(
            data => {
              localStorage.setItem("mode", this.hierarchyService.mode);
              for (let item of globals.menuList) {
                if (item.name.toLocaleLowerCase() == this.hierarchyService.mode.toLocaleLowerCase()) {
                  if (this.hierarchyService.mode == "Device") {
                    menusList = this.remove(globals.menuList, "Hierarchy");
                  } else {
                    menusList = this.remove(globals.menuList, "Device");
                  }
                }
              }
              localStorage.setItem("menu", JSON.stringify(menuList));
              if (this.hierarchyService.mode == "Device") {
                this.router.navigate(['./device']);
              }
              else {
                this.router.navigate(['./hierarchy']);
              }

            }
          );



        } else {
          alert('username or password invalid.');
        }


      },
      error => alert(error)

      );
  }
  remove(array, element) {
    return array.filter(e => e !== element);
  }



}
