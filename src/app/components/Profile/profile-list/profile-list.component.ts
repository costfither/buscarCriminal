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
    let filterName = this.profiles.filter((profile) => {
      if (profile.name?.includes(this.profileFilter.name)) return true;
      return false;
    });
    let filterSurname1 = filterName.filter((profile) => {
      if (profile.surname1?.includes(this.profileFilter.surname1)) return true;
      return false;
    });
    let filterSurname2 = filterSurname1.filter((profile) => {
      if (profile.surname2?.includes(this.profileFilter.surname2)) return true;
      return false;
    });
    let filterHairColor = filterSurname2.filter((profile) => {
      if (profile.hairColor?.includes(this.profileFilter.hairColor))
        return true;
      return false;
    });
    let filterEyeColor = filterHairColor.filter((profile) => {
      if (profile.eyeColor?.includes(this.profileFilter.eyeColor)) return true;
      return false;
    });
    let filterSkinColor = filterEyeColor.filter((profile) => {
      if (profile.skinColor?.includes(this.profileFilter.skinColor))
        return true;
      return false;
    });

    this.filterProfiles = filterSkinColor;
    console.log(this.filterProfiles);
  }

  viewProfile(profileID: string): void {
    this.router.navigateByUrl('/profiles/' + profileID);
  }
  clear() {
    this.profileFilter = new ProfileDTO('');
  }
}
