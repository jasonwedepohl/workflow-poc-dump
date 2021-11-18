import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectOfferingComponent } from './pages/select-offering/select-offering.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { OfferingAComponent } from './pages/offering-a/offering-a.component';
import { OfferingBComponent } from './pages/offering-b/offering-b.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { CamundaService } from './camunda.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectOfferingComponent,
    OnboardingComponent,
    OfferingAComponent,
    OfferingBComponent,
    AddUserComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [CamundaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
