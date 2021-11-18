import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-offering-b',
  templateUrl: './offering-b.component.html'
})
export class OfferingBComponent {

  fieldA: string = "";
  fieldB: string = "";
  fieldC: string = "";
  fieldD: string = "";

  constructor(private router: Router, private requestService: RequestsService) { }

  submitOffering(): void {
    this.requestService.addOffering('B', this.fieldA, this.fieldB, this.fieldC, this.fieldD).subscribe(offeringId => {
      this.router.navigate(['/add-user'], { state: { offeringId } });
    });

  }
}
