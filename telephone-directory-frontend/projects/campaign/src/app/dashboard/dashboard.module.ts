import { NgModule } from '@angular/core';
import { CoreModule } from '@core/index';
import { SharedModule } from '@shared/index';
import { DashboardComponent } from './dashboard.component';
import { ProgressBarModule } from '@shared/progress-bar/progress-bar.module';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        ProgressBarModule,
    ],
    declarations: [
        DashboardComponent,
        // RedeemCountPieChartComponent
        ],
    exports : [
        DashboardComponent,
        // RedeemCountPieChartComponent
    ]
})
export class DashboardModule { }