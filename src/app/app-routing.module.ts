import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'activity-select',
    loadChildren: () => import('./pages/activity-select/activity-select.module').then(m => m.ActivitySelectPageModule)
  },
  {
    path: 'activity-list',
    loadChildren: () => import('./pages/activity-list/activity-list.module').then(m => m.ActivityListPageModule)
  },
  {
    path: 'activity-tracking',
    loadChildren: () => import('./pages/activity-tracking/activity-tracking.module').then(m => m.ActivityTrackingPageModule)
  },
  {
    path: 'activity-display',
    loadChildren: () => import('./pages/activity-display/activity-display.module').then(m => m.ActivityDisplayPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
