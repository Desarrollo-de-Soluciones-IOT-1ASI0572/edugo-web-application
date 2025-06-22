import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterModule} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {ProfilesManagementService} from '../../../profiles/services/profiles-management.service';
import {UserProfile} from '../../../profiles/models/profile.model';

@Component({
  selector: 'app-component-sidebar',
  imports: [MatListModule, MatIconModule, RouterModule, TranslateModule],
  templateUrl: './component-sidebar.component.html',
  styleUrl: './component-sidebar.component.css',
})
export class ComponentSidebarComponent {
  userName = '';
  userRole = 'Administrador';
  photoUrl = '';

  constructor(
    private profileService: ProfilesManagementService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getLoggedInUserProfile().subscribe({
      next: (profile: UserProfile) => {
        this.userName = profile.fullName;
        this.photoUrl = profile.photoUrl;
      },
      error: (err) => {
        console.error('❌ Error cargando perfil del usuario:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
