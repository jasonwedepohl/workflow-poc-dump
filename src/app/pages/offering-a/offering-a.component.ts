import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-offering-a',
  templateUrl: './offering-a.component.html'
})
export class OfferingAComponent {

  fieldA: string = "";
  fieldB: string = "";
  fieldC: string = "";

  constructor(private router: Router, private requestService: RequestsService) { }

  submitOffering(): void {
    this.requestService.addOffering('A', this.fieldA, this.fieldB, this.fieldC).subscribe(offeringId => {
      this.router.navigate(['/add-user'], { state: { offeringId } });
    });
  }
}
