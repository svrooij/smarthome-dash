import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { NguiMapModule} from '@ngui/map';
import { MqttModule, MqttService } from 'ngx-mqtt';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';
import { DeviceService } from "./shared/device/device.service";
import { ConnectedComponent } from './shared/connected/connected.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DeviceComponent } from './shared/device/device.component';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapsComponent,
    NotificationsComponent,
    SettingsComponent,
    ConnectedComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DeviceComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: SettingsService.mqttServiceFactory
    })

  ],
  providers: [SettingsService,DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
