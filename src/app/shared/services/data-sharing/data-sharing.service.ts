import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private Audit_trail = new BehaviorSubject<string|any>(undefined);
  audit_trail_data = this.Audit_trail.asObservable();

  updateAuditTrailData(data: string) {
    this.Audit_trail.next(data);
  }

  private Assigned_category = new BehaviorSubject<any>(undefined);
  assigned_category_data = this.Assigned_category.asObservable();

  updateAssignedCategoryData(data: any) {
    this.Assigned_category.next(data);
  }
  private Add_user = new BehaviorSubject<any>(undefined);
  assigned_user_data = this.Add_user.asObservable();

  updateAssignedUserData(data: any) {
    this.Add_user.next(data);
  }
  private Get_user = new BehaviorSubject<any>(undefined);
  get_user_data = this.Get_user.asObservable();

  updateGetUserData(data: any) {
    this.Get_user.next(data);
  }
  private Post_Pdf_Detail = new BehaviorSubject<any>(undefined);
  Post_Pdf_data = this.Post_Pdf_Detail.asObservable();

  updatePdfData(data: any) {
    this.Get_user.next(data);
  }

  
}
