import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { UIModule } from "../../shared/ui/ui.module";
import { WidgetModule } from "../../shared/widget/widget.module";

import {
  NgbDropdownModule,
  NgbTooltipModule,
  NgbNavModule,
} from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";

import { DefaultComponent } from "./default/default.component";

import { GaugeChartModule } from "angular-gauge-chart";

import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
    SimplebarAngularModule,
    FusionChartsModule,
    GaugeChartModule,
  ],
})
export class DashboardsModule {}
