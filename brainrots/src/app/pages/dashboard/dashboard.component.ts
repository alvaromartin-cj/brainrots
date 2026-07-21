import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userEmail = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const result = await this.authService.getUser();

    if (result.success && result.data?.user?.email) {
      this.userEmail = result.data.user.email;
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
