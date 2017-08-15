import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { SecurityComponent } from './security/security.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'security',
        component: SecurityComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
]
