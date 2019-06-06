import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html'
})
export class SampleFormComponent implements OnInit {

    /*phone masking*/
    public mask =  ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  
    /*phone validation*/
  
    @Input()
    maxlength: number
  
    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  // we used reactive forms and validations

  @Input() account: Account;
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
   this.createForm();
  }

  createForm() { 
    this.angForm = this.fb.group({
      empName:      ['', Validators.required],
      tax:          ['', Validators.required],
      employerID:   ['', Validators.required],
      contactName:  ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      mobile: ['', Validators.required],
      phone: ['', Validators.required],
      zip:          ['', Validators.required],
      date:         ['', Validators.required],
      status:    ['', Validators.required],
      recoveryEmail: ['',  Validators.email],
      employerAddress: this.fb.array([
        this.employerAddressFormGroup()
      ])
    });
  }

 //  dynamic form control array function

  employerAddressFormGroup(): FormGroup {
    return this.fb.group({
      addressLine1:  [''],
      addressLine2:  [''],
      city:  [''],
      state:  ['',  Validators.required],
      zip:  ['',  Validators.required],
      county:  ['',  Validators.required],

    });
  }
  

 // add dynamic row btn function

  addEmployerClick(): void {
    (<FormArray>this.angForm.get('employerAddress')).push(this.employerAddressFormGroup());
  }

  // remove dynamic row btn function

  removeEmpAddressBtn(employerAddressGroupIndex: number): void {
    (<FormArray>this.angForm.get('employerAddress')).removeAt(employerAddressGroupIndex);
  }


  // multiselect dropdown code here
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit(): void{
      this.dropdownList = [
        {"id":1,"itemName":"Active"},
        {"id":2,"itemName":"Inactive"},
        {"id":3,"itemName":"All"},
                          ];
      this.selectedItems = [
        {"id":2,"itemName":"Inactive"},
                          ];
      this.dropdownSettings = { 
        singleSelection: false, 
        text:"Status",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"multiselect"
      }; 

      
      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
     
  }

  public changeSuccessMessage() {
    this._success.next('Record deleted successfully.');
  }

}
