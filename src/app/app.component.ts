import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['signin']),
    });
  }
}
