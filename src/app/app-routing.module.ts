import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { OfferingAComponent } from './pages/offering-a/offering-a.component';
import { OfferingBComponent } from './pages/offering-b/offering-b.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { SelectOfferingComponent } from './pages/select-offering/select-offering.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    pathMatch: 'full'
  },
  {
    path: 'select-offering',
    component: SelectOfferingComponent,
  },
  {
    path: 'offering-a',
    component: OfferingAComponent,
  },
  {
    path: 'offering-b',
    component: OfferingBComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
