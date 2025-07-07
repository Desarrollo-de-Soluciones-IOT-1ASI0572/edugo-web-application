import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('current_user') || '{}');

  if (user.role === 'admin') {
    return true;
  } else {
    router.navigate(['/calendar']);
    return false;
  }
};
