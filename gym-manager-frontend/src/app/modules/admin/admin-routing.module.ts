import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent, children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      // {
      //   path: 'contact', component: ContactComponent
      // },
      // {
      //   path: 'about', component: AboutComponent
      // },
      // {
      //   path: 'services', component: ServicesComponent
      // },
      {
        path: '', redirectTo: '/admin/home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
