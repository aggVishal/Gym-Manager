import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  membersList: any;
  gymId: any;

  constructor(private authservice: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }


  ngOnInit(): void {
  }

  private updateDefault = new Promise((resolve, reject) => {

    this.authservice.isLoggedInObservable().subscribe(result => {
      if (!result.success) {
        this.authservice.logout();
        console.log(result.message);
      }
      else {
        this.gymId = result.result.gymId;

        this.authservice.getMembersByGymIdObservable(this.gymId).subscribe(result => {
          if (result.success) {
            this.membersList = result.result;
            console.log("Array membersList is updated = ", this.membersList);
            resolve(console.log("default updated successfully."));
          }
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => {
      console.log(err);
    });
  });

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      duration: 2000,
    });
  }



  removeItem(item: any) {
    this.membersList.forEach((value: any, index: any) => {
      if (value == item) {
        new Promise((resolve, reject) => {
          this.authservice.deleteMember(value.memberId).subscribe(async result => {
            if (result.success) {
              await this.openSnackBar("Member deleted!", "Close");
              resolve(console.log("Member deleted:",value.memberId));
            }
            else {
              reject(console.log(result.message));
            }
          }, (err) => {
            reject(console.log(err));
          });
        }).then(async (value) => {
          await this.membersList.splice(index, 1);

        }).catch(err => {
          console.log(err);
        })
      }
    })
  }


  


  openAddMemberDialog() {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '250px',
      data: {gymId: this.gymId},
    });
    dialogRef.afterClosed().subscribe(result => {

      this.authservice.getMembersByGymIdObservable(this.gymId).subscribe(result => {
        if (result.success) {
          this.membersList = result.result;
          console.log("Array membersList is updated = ", this.membersList);
          console.log("dialog closed");
        }
      }, (err) => {
        console.log(err);
      });


    });
  }

}
