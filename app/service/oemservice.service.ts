import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Contact } from './../vo/contact';
import { Headers, RequestOptions } from '@angular/http';
import { debounce } from 'rxjs/operator/debounce';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../vo/alert';





@Injectable()
export class OemService {

  callerID = '12345';
  apidomain = 'https://kem.greenkoncepts.com/';

  constructor(private http: Http, private router: Router,
    private dataService: DataService
  ) { }

  login(username: string, credential: string) {
    const loginAPI = this.apidomain + 'ems/services/ResourceService/login?username=' + username + '&credential=' + credential + '&callerID=' + this.callerID;
    return this.http.get(loginAPI).map(res => this.checkForSessionEnd(res));
  }



  checkForSessionEnd(response: any) {
    let res = response.json();
    if (res.hasOwnProperty('errorBean') && (res.errorBean !== null || res.errorBean !== undefined)) {
      if (res.errorBean.hasOwnProperty('data')
        && res.errorBean.data.length === 2 &&
        res.errorBean.data[1].name === 'ErrorCode' && res.errorBean.data[1].value === '013') {
        this.logOutUser();
        return;
      } else if (res.errorBean.dataBean !== null && res.errorBean.dataBean.length == 2) {
        if (res.errorBean.dataBean[1].value === '013') {
          this.logOutUser();
          return;
        }
      }
    }

    return res;
  }

  logOutUser() {
    this.logout()
      .subscribe(
      data => {
        localStorage.removeItem(localStorage.getItem("key"));
        localStorage.removeItem("key");
        localStorage.removeItem("username");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        this.router.navigate(['./login']);
      }
      );

  }
  logout() {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/logout?key=' + this.dataService.key + '&callerID=logout')
      .map(res => res.json());
  }
  getNodesData(id) {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/get-nodes-data?key=' + this.dataService.key + '&id=' + id + '&account=&callerID=callerID')
      .map(response => this.checkForSessionEnd(response));;
  }
  getBinnedEvents(beginDate: number, endDate: number, binEnum: number, dataNames: string, nodeName: string) {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/binnedEvents?key=' + this.dataService.key +
      '&callerID=getNodesBinnedEvents&nodeNames=' + nodeName +
      '&endDate=' + endDate + '&beginDate=' + beginDate + '&binEnum=' + binEnum + '&dataNames=' + dataNames)
      .map(res => this.checkForSessionEnd(res));
  }
  getNodes() {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/nodes?key=' + this.dataService.key + '&callerID=callerID')
      .map(res => this.checkForSessionEnd(res));
  }
  getNodesDataByNodeId(id) {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/get-node?key=' + this.dataService.key + '&id=' + id + '&account=&callerID=callerID&callback')
      .map(res => this.checkForSessionEnd(res));
  }
  getInstantaneousEvents(nodeName: string, dataName: string, callerID: string) {

    return this.http.get(this.apidomain + 'ems/services/ResourceService/getInstantEventsByNode?key=' + this.dataService.key + '&nodeName=' + nodeName + '&dataName=' + dataName + '&callerID=' + callerID)
      .map(res => this.checkForSessionEnd(res));
  }
  getInstantaneousEvents_new(nodeName: string, dataName: string, callerID: string) {

    return this.http.get(this.apidomain + 'ems/services/ResourceService/getInstantaneousEvents?key=' + this.dataService.key + '&nodeName=' + nodeName + '&dataName=' + dataName + '&callerID=' + callerID)
      .map(res => this.checkForSessionEnd(res));
  }
  watchByNode(nodeName: string) {
    return this.http.get(this.apidomain + "ems/services/ResourceService/watchByNode?key=" + this.dataService.key + "&nodeName=" + nodeName + "&callerID=callerID&callback")
      .map(res => this.checkForSessionEnd(res));
  }

  getAllContacts(type: string) {
    return this.http.get(this.apidomain + "ems/contact/getAll?key=" + this.dataService.key + "&type=" + type + "&callerID=callerID&callback")
      .map(res => this.checkForSessionEnd(res));
  }
  deleteContact(contactName: string) {
    return this.http.get(this.apidomain + "ems/contact/delete?key=" + this.dataService.key + "&contactName=" + contactName + "&callerID=callerID&callback")
      .map(res => this.checkForSessionEnd(res));
  }

  createContact(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers });
    const body = "key=" + this.dataService.key + "&object=" + JSON.stringify(contact) + "&callerID=callerID";
    return this.http.post(this.apidomain + "ems/contact/create", body, options).map(res => this.checkForSessionEnd(res));

  }

  updateContact(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers });
    const body = "key=" + this.dataService.key + "&contact=" + JSON.stringify(contact) + "&callerID=callerID";
    return this.http.post(this.apidomain + "ems/contact/update", body, options)
      .map(res => this.checkForSessionEnd(res));

  }
  private handleError(error: any) {

    // let errMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    // return Promise.reject(errMsg);
    console.log(error);
    return Promise.reject(error);
  }
  getStatistics(nodeName: string, dataName, beginDate, endDate) {
    return this.http.get(this.apidomain + 'ems/services/ResourceService/statistics?key=' + this.dataService.key + '&nodeName=' + nodeName + '&dataName=' + dataName + '&beginDate=' + beginDate + '&endDate=' + endDate + '&callerID=getHeader')
      .map(res => this.checkForSessionEnd(res));

  }
  getAllAlert() {
    return this.http.get(this.apidomain + "ems/alert/getAll?key=" + this.dataService.key + "&search=&callerID=callerID&page=0&perpages=100")
      .map(res => this.checkForSessionEnd(res));
  }
  createAlert(alert: Alert) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers });
    const body = "key=" + this.dataService.key + "&object=" + JSON.stringify(alert) + "&search=&callerID=callerID&page=0&perpages=100";
    return this.http.post(this.apidomain + "ems/alert/create", body, options)
      .map(res => this.checkForSessionEnd(res));
  }
  updateAlert(alert: Alert) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers });
    const body = "key=" + this.dataService.key + "&object=" + JSON.stringify(alert) + "&search=&callerID=callerID&page=0&perpages=100";
    return this.http.post(this.apidomain + "ems/alert/update", body, options)
      .map(res => this.checkForSessionEnd(res));
  }

  deleteAlert(alertName: string) {
    return this.http.get(this.apidomain + "ems/alert/delete?key=" + this.dataService.key + "&name=" + alertName + "&search=&callerID=callerID&page=0&perpages=100")
      .map(res => this.checkForSessionEnd(res));
  }

  getAllHistoryAlert(nodeName: string, term = "") {
    return this.http.get(this.apidomain + 'ems/alert/getEventLogs?key=' + this.dataService.key + "&search=" + term + '&nodeName=' + nodeName + "&from=0&recordPerPage=50&isTimestampDesc=true&logType=3&callerID=callerID"
      // +"&startDate=" + startDate + "&endDate=" + endDate
    )
      .map(res => this.checkForSessionEnd(res));
  }
  searchHistoryAlert(nodeName: string, term = "") {
    return this.http.get(this.apidomain + 'ems/alert/getEventLogs?key=' + this.dataService.key + "&search=" + term + '&nodeName=' + nodeName + "&from=0&recordPerPage=50&isTimestampDesc=true&logType=3&callerID=callerID")
      .map(res => this.checkForSessionEnd(res));
  }
}
