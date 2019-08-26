import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
