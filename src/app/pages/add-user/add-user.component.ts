import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  offeringType = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  private offeringId: string = '';

  constructor(private router: Router, private requestService: RequestsService) { }

  ngOnInit(): void {
    this.requestService.getOfferingTypeFromAddUserTask()
      .subscribe(offeringType => {
        this.offeringType = offeringType;
      });
    this.offeringId = history.state.offeringId;
  }

  submitUserAndNavigateToNext() {
    this.submitUser(false);
  }

  submitUserAndAddAnother() {
    this.submitUser(true);
  }

  private submitUser(addAnother: boolean): void {
    this.requestService.addUser(this.firstName, this.lastName, this.email, this.offeringId, addAnother)
      .subscribe(_ => {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        if (!addAnother) {
          this.router.navigate(['/welcome']);
        }
      });
  }
}
