import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const result = await authService.getUser();

    if (result.success && result.data?.user) {
      return true;
    }
  } catch (error) {
    console.warn('Auth guard check failed', error);
  }

  return router.createUrlTree(['/']);
};
