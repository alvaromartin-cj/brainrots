import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = error.message;
      return typeof message === 'string' ? message : 'No se pudo iniciar sesión.';
    }

    return 'No se pudo iniciar sesión.';
  }

  async onSubmit() {
    this.errorMessage = '';

    try {
      const result = await this.authService.login(this.email, this.password);

      if (!result.success) {
        this.errorMessage = this.getErrorMessage(result.error);
        return;
      }

      if (result.data?.session) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    }
  }
}
