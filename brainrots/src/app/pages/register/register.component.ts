import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  errorMessage = '';

  constructor(private readonly authService: AuthService) {}

  async onSubmit() {
    this.message = '';
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      const response = await this.authService.register(this.email, this.password);

      console.log('Supabase register response', response);

      if (!response.success) {
        const errorCode =
          typeof response.error === 'object' && response.error !== null && 'code' in response.error
            ? (response.error as { code?: string }).code
            : undefined;

        if (errorCode === 'over_email_send_rate_limit') {
          this.errorMessage =
            'Se ha alcanzado el límite de envío de correos de Supabase. Si estás en desarrollo, desactiva la confirmación por email en Authentication > Providers > Email. Si ya está desactivada, revisa la configuración del proyecto.';
          return;
        }

        const errorMessage =
          typeof response.error === 'object' && response.error !== null && 'message' in response.error
            ? (response.error as { message?: string }).message
            : 'No se pudo crear el usuario.';

        this.errorMessage = errorMessage ?? 'No se pudo crear el usuario.';
        return;
      }

      this.message = 'Usuario creado correctamente';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    } catch (error) {
      console.error('Supabase register failure', error);
      this.errorMessage = 'No se pudo crear el usuario.';
    }
  }
}
