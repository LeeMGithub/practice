import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'bidm-web';
import { environment } from '../../environments/environment';

@Component({
    // moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = { username: 'emcadm', password: '1234' };
    isError: boolean = false;
    year;
    errorMsg;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.env = environment;
    }

    ngOnInit() {
        this.year = new Date().getFullYear();
    }

    login() {
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log(data);

                    if (data.code === 0) {
                        this.router.navigate([data.params.link]);
                        // this.router.navigate(['/boe/homepage/charta']);
                    } else {
                        this.errorMsg = data.message;
                    }
                }
            );
    }
}