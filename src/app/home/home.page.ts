import { Component } from '@angular/core';
import {AppData} from '../app.data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(public router: Router) {
    if (AppData.user == null) {
      this.router.navigate(['/login']);
    }
  }

}
