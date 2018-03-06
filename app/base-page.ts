import { OemService } from "./service/oemservice.service";
import { DataService } from "./data.service";
import { ActivatedRoute, Router } from "@angular/router";
import {TimeoutService} from './timeout.service';
export abstract class BasePage {

  private dataService: DataService;
  private baserouter: Router;

  constructor(tdataService: DataService, tRouter: Router) {
    this.dataService = tdataService;
    this.baserouter = tRouter;
  }

  validateSession() {
    if (this.dataService === undefined || this.dataService.userVO === undefined) {

      let key = localStorage.getItem('key');
      let username = localStorage.getItem('username');
      let firstName = localStorage.getItem('firstName');
      let lastName = localStorage.getItem('lastName');
      
      if (key === null || key === undefined || key == "") {
        this.baserouter.navigate(['/']);
      } else {
        this.dataService.key = key;
        this.dataService.userVO = { key: key, username: username ,firstName:firstName,lastName:lastName};
        this.dataService.changeLogin(true);
      }

    }
  }
 
  
}
