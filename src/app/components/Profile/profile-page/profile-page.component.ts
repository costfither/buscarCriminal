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

  name: FormControl;
  surname1: FormControl;
  surname2: FormControl;
  hairColor: FormControl; //color de cabell
  skinColor: FormControl; //color de la pell
  ethnic_characteristics: FormControl; // caracteristiques etniques
  scars: FormControl; //cicatriu
  constitution: FormControl; //constitucio
  bornLocation: FormControl; //lloc de naixement
  dateBorn: FormControl; //data de naixement
  eyeColor: FormControl; //color dels ulls
  deaf: FormControl; //sord
  lackExtremitats: FormControl; //falta de extremitats
  mute: FormControl; //si es mud
  studies: FormControl; //llistat d'estudis
  operations: FormControl; //operacions

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

    this.name = new FormControl(this.profile.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.surname1 = new FormControl(this.profile.surname1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.surname2 = new FormControl(this.profile.surname2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.hairColor = new FormControl(this.profile.hairColor, [
      Validators.maxLength(50),
    ]);
    this.skinColor = new FormControl(this.profile.skinColor, [
      Validators.maxLength(50),
    ]);
    this.eyeColor = new FormControl(this.profile.eyeColor, [
      Validators.maxLength(100),
    ]);
    this.ethnic_characteristics = new FormControl(
      this.profile.ethnic_characteristics,
      [Validators.maxLength(100)]
    );
    this.scars = new FormControl(this.profile.scars);
    this.constitution = new FormControl(this.profile.constitution, [
      Validators.maxLength(100),
    ]);
    this.bornLocation = new FormControl(this.profile.bornLocation, [
      Validators.maxLength(250),
    ]);
    this.dateBorn = new FormControl(this.profile.dateBorn, [
      Validators.maxLength(100),
    ]);
    this.deaf = new FormControl(this.profile.deaf);
    this.lackExtremitats = new FormControl(this.profile.lackExtremitats);
    this.mute = new FormControl(this.profile.mute);
    this.studies = new FormControl(this.profile.studies);
    this.operations = new FormControl(this.profile.operation);
    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname1,
      surname_2: this.surname2,
      hairColor: this.hairColor,
      skinColor: this.skinColor,
      eyeColor: this.eyeColor,
      ethnic_characteristics: this.ethnic_characteristics,
      scars: this.scars,
      constitution: this.constitution,
      bornLocation: this.bornLocation,
      deaf: this.deaf,
      lackExtremitats: this.lackExtremitats,
      mute: this.mute,
      studies: this.studies,
      operations: this.operations,
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
