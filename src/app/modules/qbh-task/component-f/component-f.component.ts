import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-component-f',
  templateUrl: './component-f.component.html',
  styleUrls: ['./component-f.component.scss']
})
export class ComponentFComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
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
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(private _snackBarService: SnackBarService,
     private _dataSharingService: DataSharingService,
     public dialogRef: MatDialogRef<ComponentFComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    // this._dataSharingService.Post_Pdf_data.subscribe((res) => {
    //   if (res) {
    //     this.viewPDF(res);
    //   }
    // });
    this.viewPDF();
  }
  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  viewPDF() {
    this.pdfDoc = pdfMake.createPdf(this.documentDefinition);
    if (this.pdfDoc) {
      this.pdfDoc.open();
      this._snackBarService.success("PDF Opened Successfully");
    } else {
     this._snackBarService.error("Failed To View PDF");
    }
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//



}
