import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { YesNoDialogComponent } from '../home/dialogs/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  checkToken() {
    return this.auth.isLoggedIn();
  }

  logout() {

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: { message: "Are you sure want to logout?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.auth.logout();
      }
    })

  }
}
