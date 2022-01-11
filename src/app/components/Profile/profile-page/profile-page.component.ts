import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ProfileService } from 'src/app/services/profile.service';
import * as ProfileAction from '../actions';
import { ProfileDTO } from '../models/profile.dto';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profile: ProfileDTO;

  //operation: FormControl; //operacions
  hairColor: FormControl; //color de cabell
  scars: FormControl; //cicatriu
  //constitution: FormControl; //constitucio
  skinColor: FormControl; //color de la pell
  //bornLocation: FormControl; //lloc de naixement
  name: FormControl; //nom
  dateBorn: FormControl; //data de naixement
  surname2: FormControl; //segon cognom
  eyeColor: FormControl; //color dels ulls
  //deaf: FormControl; //sord
  //lackExtremitats: FormControl; //falta de extremitats
  //mute: FormControl; //si es mud
  surname1: FormControl; //primer cognom;
  //age: FormControl; //edat
  //studies: FormControl; //llistat d'estudis

  profileForm: FormGroup;
  isValidForm: boolean | null;

  errorResponse: any;
  private isUpdateMode: boolean;
  private profileId: string | null | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.profile = new ProfileDTO('');
    this.isUpdateMode = false;

    this.name = new FormControl(this.profile.name, [Validators.maxLength(55)]);
    this.surname1 = new FormControl(this.profile.surname1, [
      Validators.maxLength(155),
    ]);
    this.surname2 = new FormControl(this.profile.surname2, [
      Validators.maxLength(155),
    ]);
    this.hairColor = new FormControl(this.profile.hairColor, [
      Validators.maxLength(100),
    ]);
    this.scars = new FormControl(this.profile.scars, []);
    this.skinColor = new FormControl(this.profile.skinColor, [
      Validators.maxLength(100),
    ]);
    this.eyeColor = new FormControl(this.profile.eyeColor, [
      Validators.maxLength(100),
    ]);
    this.dateBorn = new FormControl(this.profile.dateBorn, []);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname1: this.surname1,
      surname2: this.surname2,
      hairColor: this.hairColor,
      scars: this.scars,
      skinColor: this.skinColor,
      eyeColor: this.eyeColor,
      dateBorn: this.dateBorn,
    });
  }

  ngOnInit(): void {
    if (this.profileId) {
      this.profileService.getProfileId().subscribe(
        (profiles: ProfileDTO[]) => {
          let profile = profiles.find(
            (profile) => profile.profileID == this.profileId
          );
          if (profile) {
            this.profile = profile;
            console.log(this.profile);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorResponse = error.error;
        }
      );
    }
  }

  private createProfile(): void {
    this.store.dispatch(ProfileAction.createProfile({ profile: this.profile }));
  }

  saveProfile(): void {
    this.isValidForm = false;
    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profile = this.profileForm.value;
    this.createProfile();
  }
}
