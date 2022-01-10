import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ProfilesAction from '../actions';
import { ProfileDTO } from '../models/profile.dto';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent {
  profiles: ProfileDTO[];
  displayedColumns: string[] = [
    'ID',
    'Nom',
    'Primer Cognom',
    'Segon Cognom',
    'Pes',
    'Alçada',
    'Edat',
  ];

  constructor(private router: Router, private store: Store<AppState>) {
    this.profiles = new Array<ProfileDTO>();
    this.store.select('profiles').subscribe((profiles) => {
      this.profiles = profiles.profiles;
    });
    this.loadProfiles();
  }

  private loadProfiles(): void {
    this.store.dispatch(ProfilesAction.getAllProfiles());
  }
}
