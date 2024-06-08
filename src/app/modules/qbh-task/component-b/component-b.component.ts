import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {
//* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  userDetails: any[] = [];
  pdfDoc: pdfMake.TCreatedPdf | null = null;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _apiService: ApiService,
    private _dataSharing: DataSharingService,
    private _snackBar: SnackBarService,
    private _dialog: MatDialog
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this.getUserDetails();
    this._dataSharing.assigned_user_data.subscribe((res)=>{
      if(res){
        this.getUserDetails();
      }
    })
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  getUserDetails() {
    this._apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
      },
      error: (err) => {
        this._snackBar.error('Failed to fetch user details.');
        throw err;
      }
    });
  }

  deleteUser(item: any) {
    const userId = item.user_id;
    this._apiService.deleteUserDetails(userId).subscribe({
      next: (res: any) => {
        this._snackBar.success(res.message);
        this.getUserDetails();
      },
      error: (err) => {
        this._snackBar.error('Failed to delete user.');
        throw err;
      }
    });
  }

 
  //* --------------------------  Public methods  --------------------------*//
  updateUser(item: any) {
    this._dataSharing.updateGetUserData(item);
  }
  //* ------------------------------ Helper Function -----------------------*//

 

  getDocumentDefinition() {
    const tableBody = [
      ['Username', 'Email Id', 'Mobile No', 'Address'],
      ...this.userDetails.map(user => [user.user_name, user.email_id, user.mobile_no, user.address])
    ];

    return {
      content: [
        {
          text: 'User Details',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', '*'],
            body: tableBody
          },
          // layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center'
        }
      }
    };
  }

  generatePDF() {
    const documentDefinition:any= this.getDocumentDefinition();
    this.pdfDoc = pdfMake.createPdf(documentDefinition);
    if (this.pdfDoc) {
      this._snackBar.success("PDF Generated Successfully");
    } else {
      this._snackBar.error("Failed To Generate PDF");
    }
  }

  downloadPDF() {
    if (this.pdfDoc) {
      this.pdfDoc.download('UserData.pdf');
    } else {
      this._snackBar.error("Please generate the PDF first.");
    }
  }

  viewPDF() {
    if (this.pdfDoc) {
      this.pdfDoc.open();
      this._snackBar.success("PDF Opened Successfully");
    } else {
      this._snackBar.error("Please generate the PDF first.");
    }
  }
  //! -------------------------------  End  --------------------------------!//




 



}
