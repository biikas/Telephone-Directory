import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { ContactCreateRequest, ContactModifyRequest, ContactResponse, ContactService } from '@core/contact/contact.service';
import { RoutingConstants } from '@core/navigation';
import { AlertService } from '@shared/alert';
import { MessageType } from 'nucleus';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



export enum DateTimeFormats {
  INPUT_VIEW_DATE = 'YYYY-MM-DD',
  VIEW_DATE = 'MMM DD, YYYY',
  VIEW_TIME = 'hh:mm a',
  INPUT_DATE_TIME = 'YYYY-MM-DD hh:mm a',
  API_DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  API_DATE = 'YYYY-MM-DD',
}

@Component({
  selector: 'app-contact-modify',
  templateUrl: './contact-modify.component.html'
})
export class ContactModifyComponent implements OnInit {

  contactCreateRequest:ContactCreateRequest;
  pendingRequest: Subscription;
  contactCreateForm: FormGroup;
  isLoading = true;
  contactResponse:ContactResponse;

  constructor(
    private formBuilder: FormBuilder,
    private contactService:ContactService,
    private alertService:AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,

    


  ) {
    this.contactCreateForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobileNumber: [null, Validators.required]
    });

    const state: any = this.router.getCurrentNavigation().extras.state;

        if (!state) {
            this.route.paramMap.subscribe((params) => {
                const contactId = Number(params.get('id'));
                if (isNaN(contactId)) {
                    this.alertService.open({
                        message: 'User not found',
                        type: MessageType.ERROR
                    });
                    this.location.back();
                    return;
                }
                this.isLoading = true;
                this.contactService.getContactDetail(contactId)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe((contactResppnse) => {
                        this.contactResponse=(contactResppnse);
                    }, (error) => {
                        this.alertService.open({
                            message: error.message,
                            type: MessageType.ERROR
                        });
                        this.location.back();
                    });
            });
        } else {
            this.isLoading = false;
            this.setContact(state);
        }
  }


  ngOnInit() {
    // this.initialize();
  }

  setContact(contactResponse:ContactResponse){
    this.contactResponse=contactResponse;

    this.contactCreateForm.patchValue({
      firstName:this.contactResponse.firstName,
      lastName:this.contactResponse.lastName,
      mobileNumber:this.contactResponse.mobileNumber
    })
  }

  contactModifyRequest:ContactModifyRequest;

  submit(valid: boolean) {
    this.contactModifyRequest={
      id:this.contactResponse.id,
      firstName:this.contactCreateForm.value.firstName,
      lastName:this.contactCreateForm.value.lastName,
      mobileNumber:this.contactCreateForm.value.mobileNumber,
      email:"",
      dateOfBirth:""
    };
    if (valid) {
      this.pendingRequest = this.contactService.modifyContact(this.contactModifyRequest).
        pipe(finalize(() => this.pendingRequest = null)).subscribe((success) => {
          this.alertService.open({ message: success.message, type: MessageType.SUCCESS });
          this.contactCreateForm.reset();
          this.router.navigateByUrl(RoutingConstants.CONTACT);
        }, (error) => {
          this.alertService.open({ message: error.message, type: MessageType.ERROR });
        });
    }
  }
}