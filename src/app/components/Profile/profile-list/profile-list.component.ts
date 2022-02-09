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
    'Data naixement',
    'Color del cabell',
    'ACTIONS',
  ];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {}

  loadProfile(): void {
    console.log(this.profileFilter.name);
    let errorResponse: any;

    this.profileService.getAllProfile().subscribe(
      (profiles: ProfileDTO[]) => {
        this.profiles = profiles;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
      }
    );
    this.filterProfiles = this.profiles.sort((a, b) =>
      a.profileID.localeCompare(b.profileID)
    );
    let filterName = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.name != '') {
        if (profile.name?.includes(this.profileFilter.name)) return true;
      } else {
        return true;
      }
      return false;
    });
    this.filterProfiles = filterName;
    let filterSurname1 = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.surname1 != '') {
        if (profile.surname1?.includes(this.profileFilter.surname1))
          return true;
      } else {
        return true;
      }
      return false;
    });
    this.filterProfiles = filterSurname1;

    let filterSurname2 = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.surname2 != '') {
        if (profile.surname2?.includes(this.profileFilter.surname2))
          return true;
      } else {
        return true;
      }
      return false;
    });
    this.filterProfiles = filterSurname2;

    let filterHairColor = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.hairColor != '') {
        if (profile.hairColor?.includes(this.profileFilter.hairColor))
          return true;
      } else {
        return true;
      }
      return false;
    });
    this.filterProfiles = filterHairColor;

    let filterEyeColor = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.eyeColor != '') {
        if (profile.eyeColor?.includes(this.profileFilter.eyeColor))
          return true;
      } else {
        return true;
      }
      return false;
    });
    this.filterProfiles = filterEyeColor;

    let filterSkinColor = this.filterProfiles.filter((profile) => {
      if (this.profileFilter.skinColor != '') {
        if (profile.skinColor?.includes(this.profileFilter.skinColor))
          return true;
      } else {
        return true;
      }
      return false;
    });

    this.filterProfiles = filterSkinColor;
  }

  viewProfile(profileID: string): void {
    this.router.navigateByUrl('/profiles/' + profileID);
  }
  clear() {
    this.profileFilter = new ProfileDTO('');
  }
}
