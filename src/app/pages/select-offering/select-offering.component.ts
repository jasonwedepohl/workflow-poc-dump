import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-select-offering',
  templateUrl: './select-offering.component.html'
})
export class SelectOfferingComponent implements OnInit {

  constructor(private requestsService: RequestsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  selectOffering(offering: string) {
    this.requestsService.selectOffering(offering)
      .subscribe(() => {
        this.router.navigate([`/offering-${offering.toLowerCase()}`]);
      });
  }
}
