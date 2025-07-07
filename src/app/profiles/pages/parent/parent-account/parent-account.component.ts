import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilesManagementService } from '../../../services/profiles-management.service';
import { UserProfile } from '../../../models/profile.model';

@Component({
  selector: 'app-parent-account',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './parent-account.component.html',
  styleUrls: ['./parent-account.component.css']
})
export class ParentAccountComponent implements OnInit {
  userProfile!: UserProfile;
  loading = true;

  constructor(
    private profileService: ProfilesManagementService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.profileService.getLoggedInUserProfile().subscribe({
      next: (profile: UserProfile) => {
        this.userProfile = profile;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading user profile:', error);
        this.loading = false;
      }
    });
  }
}
