import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { ContactComponent } from './contact.component';
import { ContactCreateComponent } from './create-contact/contact-create.component';


@NgModule({
  declarations: [
    ContactComponent,
    ContactCreateComponent,
    ContactDetailComponent,
    ContactModifyComponent,
    // Ng2SearchPipeModule
  ],
  imports: [CommonModule, SharedModule, RouterModule ],
  exports: [],
})
export class ContactModule {}
