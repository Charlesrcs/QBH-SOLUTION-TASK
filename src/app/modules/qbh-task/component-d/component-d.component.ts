import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-component-d',
  templateUrl: './component-d.component.html',
  styleUrls: ['./component-d.component.scss']
})
export class ComponentDComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
userDetails:any[]=[];
pdfDoc: pdfMake.TCreatedPdf | null = null;

documentDefinition:any = {
    content: [
        {
            text: 'User Details',
            style: 'header'
        },
        {
            table: {
                headerRows: 1,
                widths: ['*', 'auto', 200],
                body: [
                    ['Username', 'Emailid', 'Mobileno','Address'],
                    ...this.userDetails.map(user => [user.user_name, user.email_id, user.mobile_no,user.address])
                ]
            },
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
  //* -----------------------  Variable Declaration  -----------------------*//

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(private _snackBarService:SnackBarService,
    private _apiService:ApiService,
    private _dataSharingService:DataSharingService,
    public dialogRef: MatDialogRef<ComponentDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this.getUserDetails();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getUserDetails() {
    this._apiService.getUserDetails().subscribe({
      next: (res:any) => {
        console.log(res);
      this.userDetails=res.data;
      setTimeout(()=>{
        this.generatePDF();
      },1000)
      },
      error: (err) => {
        throw err;
      }
    });
  }
  //* --------------------------  Public methods  --------------------------*//
generatePDF() {
    // this.pdfDoc = pdfMake.createPdf(this.documentDefinition);
    if(this.data.pdf){
      // this._dataSharingService.updatePdfData(this.data);
      this._snackBarService.success("PDF Generator Successfully");
    }
    else{
      this._snackBarService.error("Failed To Generator PDF");
    }
}
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//




}
