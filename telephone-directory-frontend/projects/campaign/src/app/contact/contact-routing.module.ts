import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingConstants } from '@core/navigation';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { ContactComponent } from './contact.component';
import { ContactModule } from './contact.module';
import { ContactCreateComponent } from './create-contact/contact-create.component';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
  {
    path:RoutingConstants.CREATE,
    component:ContactCreateComponent
  },
  {
    path:RoutingConstants.ID,
    component:ContactDetailComponent
  },
  {
    path: RoutingConstants.MODIFY_USER + '/' + RoutingConstants.ID,
    component:ContactModifyComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes), ContactModule],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
