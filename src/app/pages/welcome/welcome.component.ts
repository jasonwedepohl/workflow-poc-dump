import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    initialised = false;

    constructor(private router: Router, private requestsService: RequestsService) { }

    ngOnInit(): void {
        this.requestsService.initialise()
            .subscribe(() => {
                this.initialised = true;
            });
    }

    startAnother(): void {
        this.requestsService.startWorkflow()
            .subscribe(() => {
                this.router.navigate(['/select-offering']);
            });
    }
}
