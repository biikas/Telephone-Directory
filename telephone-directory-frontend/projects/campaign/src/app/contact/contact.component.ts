import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeStatusRequest } from '@app/users';
import { ContactListResponse, ContactResponse, ContactSearchRequest, ContactService } from '@core/contact/contact.service';
import { RoutingConstants } from '@core/navigation';
import { AlertService } from '@shared/alert';
import { MessageType } from 'nucleus';
import { forkJoin } from 'rxjs';

const REQUEST_DATE_FORMAT = 'YYYY-MM-DD';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
})

export class ContactComponent implements OnInit {

    routeToCreateUser = '/' + [RoutingConstants.CONTACT] + '/' + [RoutingConstants.CREATE];
    contactList: ContactResponse[] = [];
    contactSearchForm: FormGroup;


    showSearch = false;

    constructor(
        private contactService: ContactService,
        private router: Router,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
    ) {
        this.contactSearchForm = this.formBuilder.group({
            keyword: [null, [Validators.required]],
        });
    }


    ngOnInit() {
        this.initialize();
        console.log("without search Contact List", this.contactList);
        // this.search("bikas")
        // console.log("without search ",this.contactList);

    }

    initialize() {
        forkJoin(
            this.contactService.getAllContacts(),
        ).subscribe(([contactList]) => {
            this.contactList = contactList;
            console.log("Contact List", this.contactList)
        });
    }

    viewDetails(id: number) {
        this.router.navigate([RoutingConstants.CONTACT + '/' + id]);
    }

    modify(contactRespone: ContactResponse) {
        this.router.navigate([RoutingConstants.CONTACT, RoutingConstants.MODIFY_USER, contactRespone.id], { state: contactRespone });
    }

    changeStatus(contactId: number) {
        this.contactService.deleteContact(contactId).subscribe((response) => {
            this.alertService.open({ message: response.message, type: MessageType.SUCCESS });
            this.initialize();
        })
    }

    contactSearchRequest: ContactSearchRequest;

    searchSubmit(keyword: string) {

        this.contactSearchRequest = {
            keyword: this.contactSearchForm.value.keyword
        }

        console.log("request", this.contactSearchRequest);
        forkJoin(
            this.contactService.searchContact(this.contactSearchRequest),
        ).subscribe(([contactList]) => {
            this.contactList = contactList;
            console.log("New Contact List", this.contactList)
        });
    }

    toggleSearch() {
        if (this.showSearch) {
            this.showSearch = false;
        } else {
            this.showSearch = true;
        }
    }
    reset() {
        this.initialize();
    }

    arrange(){
        this.contactList.sort((a, b) => a.firstName.localeCompare(b.firstName))
    }
    


}
