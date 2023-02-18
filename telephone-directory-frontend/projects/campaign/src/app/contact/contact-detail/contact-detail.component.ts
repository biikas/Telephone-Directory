import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '@core/constants';
import { ContactListResponse, ContactResponse, ContactService } from '@core/contact/contact.service';
import { AlertService } from '@shared/alert';
import { MessageType } from 'nucleus';

import { finalize } from 'rxjs/operators';

const REQUEST_DATE_FORMAT = 'YYYY-MM-DD';

@Component({
    selector: 'app-contact',
    templateUrl: './contact-detail.component.html',
})

export class ContactDetailComponent implements OnInit {

    //routeToCreateUser = '/' + [RoutingConstants.CONTACT] + '/' + [RoutingConstants.CREATE];
    //contactList: ContactResponse[]=[];
    contactID:number;
    isLoading = true;

    contactDetail :ContactResponse;
    fullName ="";


    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService:AlertService,
        public appConstants: AppConstants,
    ) {
        this.route.params.subscribe((param) => {
            if (param.id) {
              this.contactID = param.id;
              this.contactService.getContactDetail(param.id)
                .pipe(finalize(() => this.isLoading = false))
                .subscribe((response) => {
                  this.contactDetail = response;
                }, (error) => {
                  this.alertService.open({
                    message: error.message,
                    type: MessageType.ERROR
                  });
                });
            }
          })
        //   this.fullName=this.contactDetail.firstName+" "+this.contactDetail.lastName;

    }


    ngOnInit() {
        // this.initialize();
        // console.log("Contact List",this.contactList);
    }

    initialize() {
        // forkJoin(
        //     this.contactService.getTransactionDetail(),
        // ).subscribe(([contactList]) => {
        //     this.contactList = contactList;
        //     console.log("Contact List",this.contactList)
        // });
    }

    // viewDetails(id: number) {
    //     this.router.navigate([RoutingConstants.CONTACT + '/' + id]);
    // }

}
