import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const parentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('current_user') || '{}');
  console.log('[ParentGuard] User from localStorage:', user); // 👈 LOG 1
  console.log('[ParentGuard] Role:', user.role);

  if (user.role === 'parent') {
    return true;
  } else {
    router.navigate(['/analytics/dashboard']);
    return false;
  }
};
