import { Component, Inject, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/shared/services/api/api.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-component-e',
  templateUrl: './component-e.component.html',
  styleUrls: ['./component-e.component.scss']
})
export class ComponentEComponent implements OnInit {
    
  //* --------------------------  Start  -----------------------------------*//
  
    //* -----------------------  Decorated Methods  --------------------------*//
  
    //* -----------------------  Variable Declaration  -----------------------*//
    userDetails: any[]=[];
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
    constructor(private _apiService:ApiService,
      private _snackBarService:SnackBarService,
      private _dataSharingService:DataSharingService,
      public dialogRef: MatDialogRef<ComponentEComponent>,
      @Inject(MAT_DIALOG_DATA) public data1: any
    ) { }

    //* -------------------------  Lifecycle Hooks  --------------------------*//
    ngOnInit(): void {
      // this._dataSharingService.Post_Pdf_data.subscribe((res)=>{
      //   if(res){
      //     this.downloadPDF(res)
      //   }
      // });
      this.getUserDetails();
    }
    //* ----------------------------  APIs Methods  --------------------------*//
    getUserDetails() {
      this._apiService.getUserDetails().subscribe({
        next: (res:any) => {
          console.log(res);
        this.userDetails=res.data;
        setTimeout(()=>{this.downloadPDF()},1000);
        },
        error: (err) => {
          throw err;
        }
      });
    }
    //* --------------------------  Public methods  --------------------------*//


//   userData: User[] = [
//     { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
//     { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
//     { name: 'Michael Brown', age: 42, email: 'michael.brown@example.com' }
// ];




// Function to download the generated PDF
downloadPDF() {
  this.pdfDoc = pdfMake.createPdf(this.data1);
  console.log(this.pdfDoc,'sdsds');
  
    if (this.pdfDoc) {
        this.pdfDoc.download('UserData.pdf');
    } else {
      this._snackBarService.error("Failed To Download PDF")
    }
}


    //* ------------------------------ Helper Function -----------------------*//
  
    //! -------------------------------  End  --------------------------------!//



}
interface User {
  name: string;
  age: number;
  email: string;
}