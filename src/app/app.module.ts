import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { NguiMapModule} from '@ngui/map';
import { MqttModule, MqttService } from 'ngx-mqtt';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapsComponent,
    NotificationsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: SettingsService.mqttServiceFactory
    })

  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
