import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

  constructor(private requestsService: RequestsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.requestsService.startWorkflow()
      .subscribe(() => {
        this.router.navigate(['/select-offering']);
      });
  }
}
