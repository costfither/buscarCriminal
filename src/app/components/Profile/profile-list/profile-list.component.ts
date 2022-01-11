import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDTO } from '../models/profile.dto';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent implements OnInit {
  profileFilter: ProfileDTO = new ProfileDTO('');
  profiles: ProfileDTO[] = [];
  filterProfiles: ProfileDTO[] = [];
  displayedColumns: string[] = [
    'ID',
    'Nom',
    'Primer Cognom',
    'Segon Cognom',
    'Edat',
    'Color del cabell',
  ];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {}

  loadProfile(): void {
    let errorResponse: any;

    this.profileService.getAllProfile().subscribe(
      (profiles: ProfileDTO[]) => {
        this.profiles = profiles;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
      }
    );
    this.filterProfiles = this.profiles.filter((profile) => {
      if (this.profileFilter.name) {
        if (this.profileFilter.name?.length > 0) {
          if (profile.name == this.profileFilter.name) return true;
          return false;
        } else {
          return true;
        }
      }
      return true;
    });
    console.log(this.filterProfiles);
  }

  viewProfile(profileID: string): void {
    this.router.navigateByUrl('/profiles/' + profileID);
  }
}
