import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AgmCoreModule } from '@agm/core';
import { MqttModule, MqttService } from 'ngx-mqtt';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';
import { DeviceService } from './shared/device/device.service';
import { ConnectedComponent } from './shared/connected/connected.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DeviceComponent } from './shared/device/device.component';
import { SecurityComponent } from './security/security.component';
import { ClimateComponent } from './climate/climate.component';

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
    SecurityComponent,
    ClimateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'
    }),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: SettingsService.mqttServiceFactory
    })

  ],
  providers: [SettingsService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
