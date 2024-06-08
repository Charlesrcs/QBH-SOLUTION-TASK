import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PostUserDetailsInterface } from 'src/app/models/user-details';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  
    //* -----------------------  Decorated Methods  --------------------------*//
    // @Output() userDetail:EventEmitter<any> =new EventEmitter<any>(); 
    //* -----------------------  Variable Declaration  -----------------------*//
    addUserForm:FormGroup;
    updateButtonFlag:boolean=false;
    addButtonFlag:boolean=true;
    userId:number=0;
    //* ---------------------------  Constructor  ----------------------------*//
    constructor(
      private _formBuilder:FormBuilder,
      private _apiService:ApiService,
      private _snackBarService:SnackBarService,
      private _route:Router,
      private _dataSharing:DataSharingService
    ) {
      this.addUserForm=this._formBuilder.group({
        username:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        mobileno:['',[Validators.required,Validators.maxLength(10)]],
        address:['',[Validators.required]],
      });
     }
    //* -------------------------  Lifecycle Hooks  --------------------------*//
    ngOnInit(): void {
      this._dataSharing.get_user_data.subscribe((res)=>{
        if (res) {
          console.log(res);
          this.updateButtonFlag=true;
          this.addButtonFlag=false;
          this.userId=res.user_id;
          this.addUserForm.controls['username'].patchValue(res.user_name);
          this.addUserForm.controls['email'].patchValue(res.email_id);
          this.addUserForm.controls['mobileno'].patchValue(res.mobile_no);
          this.addUserForm.controls['address'].patchValue(res.address);
        }
      });
    }
    //* ----------------------------  APIs Methods  --------------------------*//
  
    addUserDetail(){
      let userObj:PostUserDetailsInterface={
        user_name:this.addUserForm.controls['username'].value,
        email_id:this.addUserForm.controls['email'].value,
        mobile_no:this.addUserForm.controls['mobileno'].value,
        address:this.addUserForm.controls['address'].value,
      }
     this._apiService.addNewUser(userObj).subscribe({
        next:(res:any)=>{
          this._snackBarService.success(res.message);
          this.addUserForm.controls['username'].patchValue('');
          this.addUserForm.controls['email'].patchValue('');
          this.addUserForm.controls['mobileno'].patchValue('');
          this.addUserForm.controls['address'].patchValue('');
          this._dataSharing.updateAssignedUserData(true);
        },
        error:(err:any)=>{
          this._snackBarService.error(err);
          throw err;
        }
     });
    }
    editUserDetail(){
      let userObj:PostUserDetailsInterface={
        user_name:this.addUserForm.controls['username'].value,
        email_id:this.addUserForm.controls['email'].value,
        mobile_no:this.addUserForm.controls['mobileno'].value,
        address:this.addUserForm.controls['address'].value,
      }
     this._apiService.updateUserDetails(this.userId,userObj).subscribe({
        next:(res:any)=>{
          this._snackBarService.success(res.message);
          this.addUserForm.controls['username'].patchValue('');
          this.addUserForm.controls['email'].patchValue('');
          this.addUserForm.controls['mobileno'].patchValue('');
          this.addUserForm.controls['address'].patchValue('');
          this._dataSharing.updateAssignedUserData(true);
          this.updateButtonFlag=false;
          this.addButtonFlag=true;
        
          
        },
        error:(err:any)=>{
          this._snackBarService.error(err);
          throw err;
        }
     });
    }
    //* --------------------------  Public methods  --------------------------*//

    //* ------------------------------ Helper Function -----------------------*//
    allowLettersOnly(event: KeyboardEvent): boolean {
      const charCode = event.key.charCodeAt(0);
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
      }
      event.preventDefault();
      return false;
    }
    allowNumbersOnly(event: KeyboardEvent): boolean {
      const charCode = event.key.charCodeAt(0);
      const keyCode = event.keyCode || event.which;
    
      if ((charCode >= 48 && charCode <= 57) || keyCode === 8 || keyCode === 46) {
        return true;
      }
    
      event.preventDefault();
      return false;
    }
    //! -------------------------------  End  --------------------------------!//


  

}
