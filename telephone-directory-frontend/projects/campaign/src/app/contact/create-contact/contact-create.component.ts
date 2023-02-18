import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactCreateRequest, ContactService } from '@core/contact/contact.service';
import { RoutingConstants } from '@core/navigation';
import { AlertService } from '@shared/alert';
import { CustomValidators } from '@shared/validators';
import { MessageType } from 'nucleus';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';


export enum DateTimeFormats {
  INPUT_VIEW_DATE = 'YYYY-MM-DD',
  VIEW_DATE = 'MMM DD, YYYY',
  VIEW_TIME = 'hh:mm a',
  INPUT_DATE_TIME = 'YYYY-MM-DD hh:mm a',
  API_DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  API_DATE = 'YYYY-MM-DD',
}

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent implements OnInit {

  contactCreateRequest:ContactCreateRequest;
  pendingRequest: Subscription;
  contactCreateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService:ContactService,
    private alertService:AlertService,
    private route: Router,


  ) {
    this.contactCreateForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],      
      mobileNumber: [null, Validators.required],
      email:[null,Validators.required],
      dateOfBirth: [new Date(), [Validators.required, CustomValidators.script]],
    });
  }


  ngOnInit() {
    // this.initialize();
  }



  submit(valid: boolean) {
    this.contactCreateRequest={
      firstName:this.contactCreateForm.value.firstName,
      lastName:this.contactCreateForm.value.lastName,
      mobileNumber:this.contactCreateForm.value.mobileNumber,
      email:this.contactCreateForm.value.email,
      dateOfBirth:moment(this.contactCreateForm.value.dateOfBirth, DateTimeFormats.INPUT_VIEW_DATE).format(DateTimeFormats.INPUT_VIEW_DATE)
    };
    console.log("Request",this.contactCreateRequest);
    if (valid) {
      this.pendingRequest = this.contactService.createContact(this.contactCreateRequest).
        pipe(finalize(() => this.pendingRequest = null)).subscribe((success) => {
          this.alertService.open({ message: success.message, type: MessageType.SUCCESS });
          this.contactCreateForm.reset();
          this.route.navigateByUrl(RoutingConstants.CONTACT);
        }, (error) => {
          this.alertService.open({ message: error.message, type: MessageType.ERROR });
        });
    }
  }
}