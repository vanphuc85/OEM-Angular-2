
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DeviceComponent } from './device/device.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { HistoryComponent } from './alerts/history/history.component';
import { SetAlertComponent } from './set-alert/set-alert.component';
import { CreateAlertComponent } from './create-alert/create-alert.component';
import { HeaderComponent } from './header/header.component';
import { IsAlertsService } from './is-alerts.service';
import { MeasureAlertComponent } from './measure-alert/measure-alert.component';
import { MeasureComponent } from './measure/measure.component';
import { HistoryAlertComponent } from './history-alert/history-alert.component';
import { AlertDeviceComponent } from './alert-device/alert-device.component';
import { AlertEditComponent } from './alert-edit/alert-edit.component';
import { SelectContactComponent } from 'app/select-contact/select-contact.component';
import { HierarchyComponent } from 'app/hierarchy/hierarchy.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'hierarchy', component: HierarchyComponent },

  { path: 'dashboard-detail/:nodeName/:nodeId/:title', component: DashboardDetailComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'create-alert/:dataName/:unit/:nodeName', component: CreateAlertComponent },
  { path: 'create-alert', component: CreateAlertComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'contacts/edit-contact/:userName', component: EditContactComponent },
  { path: 'dashboard-detail', component: DeviceComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'set-alert', component: SetAlertComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'measure-alert/:nodeName/:nodeId/:title', component: MeasureAlertComponent },
  { path: 'measure/:nodeName/:nodeId/:title', component: MeasureComponent },
  { path: 'history-alert', component: HistoryAlertComponent },
  { path: 'alert-device', component: AlertDeviceComponent },
  { path: 'alert-edit/:alertId', component: AlertEditComponent },
  { path: 'alert-edit', component: AlertEditComponent },
  { path: 'select-contact/:alertId', component: SelectContactComponent },
  
];

export const appRoutingProviders: any[] = [

];



export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
