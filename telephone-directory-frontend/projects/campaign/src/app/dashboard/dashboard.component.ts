import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CampaignDetailDTO,
  DashboardService
} from '@core/dahsboard/dashboard.service';
import { AlertService } from '@shared/alert';
import { CredentialsService } from '../core/authentication';

const REQUEST_DATE_FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }
  
}
