import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicesComponent } from './components/services/services.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
// import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from "ngx-ui-loader";


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,    
    MatIconModule,
    // NgxUiLoaderModule.forRoot({
    //   "fgsType": "square-jelly-box",
    //   "fgsColor": "#fe5828",
    //   "blur": 2,
    // }),
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground: true,
    // })
  ]
})
export class AdminModule { }
