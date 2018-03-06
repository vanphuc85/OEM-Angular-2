import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app-routing';
import { LocationLoginComponent } from './location-login/location-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OemService } from './service/oemservice.service';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { DeviceComponent } from './device/device.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { AlertsComponent } from './alerts/alerts.component';
import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { HistoryComponent } from './alerts/history/history.component';
import { SetAlertComponent } from './set-alert/set-alert.component';
import { HeaderComponent } from './header/header.component';
import { HeaderserviceService } from './headerservice.service';
import { GetData } from './dashboard-detail/get-data';
import { DetailComponent } from './detail/detail.component';
import { TableComponent } from './table/table.component';
import { MomentModule } from 'angular2-moment';
import { HeaderbigService } from './headerbig.service';
import { GraphComponent } from './graph/graph.component';
import { HeaderBigComponent } from './header-big/header-big.component';
import { HeaderInputComponent } from './header-input/header-input.component';
import { IsAlertsService } from './is-alerts.service';
import { MeasureAlertComponent } from './measure-alert/measure-alert.component';
import { MeasureService } from './measure.service';
import { HeaderinputService } from './headerinput.service';
import { AlertEditComponent } from './alert-edit/alert-edit.component';
import { AlertService } from './alert.service';
import { ContactService } from './contact.service';
import { MeasureComponent } from './measure/measure.component';
import { TimeoutService } from './timeout.service';
import { HierarchyService } from './hierarchy.service';

import{TimeModeDirective} from './dashboard-detail/time-mode-directive';
import { TimeoutComponent } from './timeout/timeout.component';
import { CreateAlertComponent } from './create-alert/create-alert.component';
import { HistoryAlertComponent } from './history-alert/history-alert.component';
import { AlertDeviceComponent } from './alert-device/alert-device.component';
import { SelectContactComponent } from './select-contact/select-contact.component';
import {NgDatepickerModule} from 'ng2-datepicker';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { TreeModule } from 'angular-tree-component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocationLoginComponent,
    DeviceComponent,
    DashboardDetailComponent,
    AlertsComponent,
    ContactsComponent,
    AddContactComponent,
    EditContactComponent,
    HistoryComponent,
    SetAlertComponent,
    HeaderComponent,
    DetailComponent,
    TableComponent,
    GraphComponent,
    HeaderBigComponent,
    HeaderInputComponent,
    MeasureAlertComponent,
    AlertEditComponent,
    MeasureComponent,
    TimeModeDirective,
    TimeoutComponent,
    CreateAlertComponent,
    HistoryAlertComponent,
    AlertDeviceComponent,
    SelectContactComponent,
    ConfirmComponent,
    AlertBoxComponent,
    HierarchyComponent
  ],
  imports: [
    BrowserModule, routing,
    FormsModule,
    ReactiveFormsModule, HttpModule, MomentModule, NgDatepickerModule,TreeModule
  ],
  
  providers: [OemService, DataService, GetData, HeaderserviceService, HeaderbigService, IsAlertsService, MeasureService
    , HeaderinputService, AlertService, ContactService, TimeoutService,HierarchyService
  ],
  

  bootstrap: [AppComponent]
})
export class AppModule { }