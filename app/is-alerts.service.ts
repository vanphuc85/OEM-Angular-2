import { Injectable } from '@angular/core';
import { HeaderserviceService } from './headerservice.service';
import { CanActivate, Router,ActivatedRoute,ActivatedRouteSnapshot,RouterStateSnapshot}    from '@angular/router';


@Injectable()
export class IsAlertsService  {

  constructor(
    private headerservice: HeaderserviceService,
    private router: Router,
    private route : ActivatedRoute
  ) { 
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    
     if(this.headerservice.name == "Alerts"){
       let nodeId =  route.params['nodeId'];
       let nodeName = route.params['nodeName'];
       let title = route.params['title'];
       this.router.navigate(["/measure-alert", nodeName, nodeId,title]);
     }
      return true ;
  }
}
