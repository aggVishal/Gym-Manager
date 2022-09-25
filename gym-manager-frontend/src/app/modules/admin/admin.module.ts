import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './components/settings/settings.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { MatButtonModule } from "@angular/material/button";
import { AddMemberDialogComponent } from './components/home/dialogs/add-member-dialog/add-member-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { YesNoDialogComponent } from './components/home/dialogs/yes-no-dialog/yes-no-dialog.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SettingsComponent,
    AddMemberDialogComponent,
    YesNoDialogComponent
  ],
  entryComponents:[AddMemberDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,    
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
  ]
})
export class AdminModule { }
