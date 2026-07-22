import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  mensajeError = '';
  mensajeExito = '';
  registroCompletado = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async onSubmit() {
    this.mensajeError = '';

    // Validar que los campos no estén vacíos
    if (!this.email || !this.password || !this.confirmPassword) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      const response = await this.authService.register(this.email, this.password);

      if (!response.success) {
        // Extraer el mensaje de error
        const error = response.error;
        let mensajeError = 'Error al registrar el usuario.';

        if (error && typeof error === 'object') {
          if (error.message) {
            mensajeError = error.message;
          } else if (error.code === 'user_already_exists') {
            mensajeError = 'Este correo electrónico ya está registrado.';
          }
        }

        this.mensajeError = mensajeError;
        return;
      }

      // Registro exitoso
      this.mensajeExito = 'Registrado con éxito';
      this.registroCompletado = true;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    } catch (error) {
      this.mensajeError = 'Error al registrar el usuario.';
    }
  }

  irAlLogin() {
    this.router.navigate(['/']);
  }
}

