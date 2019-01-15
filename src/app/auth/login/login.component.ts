import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _router: Router) {}

  async login() {
    const user = await this._auth.googleSignin();

    if (user) {
      this._router.navigate(['/']);
    }
  }
}
