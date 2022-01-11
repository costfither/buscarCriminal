import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  operation: FormControl; //operacions
  hairColor: FormControl; //color de cabell
  scars: FormControl; //cicatriu
  constitution: FormControl; //constitucio
  skinColor: FormControl; //color de la pell
  bornLocation: FormControl; //lloc de naixement
  name: FormControl; //nom
  dateBorn: FormControl; //data de naixement
  surname2: FormControl; //segon cognom
  eyeColor: FormControl; //color dels ulls
  deaf: FormControl; //sord
  lackExtremitats: FormControl; //falta de extremitats
  mute: FormControl; //si es mud
  surname1: FormControl; //primer cognom;
  age: FormControl; //edat
  studies: FormControl; //llistat d'estudis

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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.profileId = params['id'];
      console.log(this.profileId);
    });

    this.profile = new ProfileDTO('');
    this.isUpdateMode = false;

    this.name = new FormControl(this.profile.name, [Validators.maxLength(55)]);
    this.surname1 = new FormControl(this.profile.surname1, [
      Validators.maxLength(255),
    ]);
    this.surname2 = new FormControl(this.profile.surname2, [
      Validators.maxLength(255),
    ]);
    this.operation = new FormControl([]);
    this.hairColor = new FormControl(this.profile.hairColor, [
      Validators.maxLength(255),
    ]);
    this.scars = new FormControl(this.profile.scars, [
      Validators.maxLength(255),
    ]);
    this.constitution = new FormControl(this.profile.constitution, [
      Validators.maxLength(255),
    ]);
    this.skinColor = new FormControl(this.profile.skinColor, [
      Validators.maxLength(255),
    ]);
    this.bornLocation = new FormControl(this.profile.bornLocation, [
      Validators.maxLength(255),
    ]);
    this.dateBorn = new FormControl(this.profile.dateBorn);
    this.eyeColor = new FormControl(this.profile.eyeColor, [
      Validators.maxLength(255),
    ]);
    this.deaf = new FormControl(this.profile.deaf);
    this.lackExtremitats = new FormControl(this.profile.lackExtremitats);
    this.mute = new FormControl(this.profile.mute);
    this.age = new FormControl(this.profile.age);
    this.studies = new FormControl(this.profile.studies);
    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname1: this.surname1,
      surname2: this.surname2,
      operation: this.operation,
      hairColor: this.hairColor,
      scars: this.scars,
      constitution: this.constitution,
      skinColor: this.skinColor,
      bornLocation: this.bornLocation,
      dateBorn: this.dateBorn,
      eyeColor: this.eyeColor,
      deaf: this.deaf,
      lackExtremitats: this.lackExtremitats,
      mute: this.mute,
      age: this.age,
      studies: this.studies,
    });

    this.store.select('profiles').subscribe((profiles) => {
      this.profile = profiles.profile;
    });
    if (this.profile) {
      console.log('Test');
      console.log(this.profile);

      this.name.setValue(this.profile.name);
      this.surname1.setValue(this.profile.surname1);
      this.surname2.setValue(this.profile.surname2);
      this.operation.setValue(this.profile.operation);
      this.hairColor.setValue(this.profile.hairColor);
      this.scars.setValue(this.profile.scars);
      this.constitution.setValue(this.profile.constitution);
      this.skinColor.setValue(this.profile.skinColor);
      this.bornLocation.setValue(this.profile.bornLocation);
      this.dateBorn.setValue(this.profile.dateBorn);
      this.eyeColor.setValue(this.profile.eyeColor);
      this.deaf.setValue(this.profile.deaf);
      this.lackExtremitats.setValue(this.profile.lackExtremitats);
      this.mute.setValue(this.profile.mute);
      this.age.setValue(this.profile.age);
      this.studies.setValue(this.profile.studies);
      this.profileForm = this.formBuilder.group({
        name: this.name,
        surname1: this.surname1,
        surname2: this.surname2,
        operation: this.operation,
        hairColor: this.hairColor,
        scars: this.scars,
        constitution: this.constitution,
        skinColor: this.skinColor,
        bornLocation: this.bornLocation,
        dateBorn: this.dateBorn,
        eyeColor: this.eyeColor,
        deaf: this.deaf,
        lackExtremitats: this.lackExtremitats,
        mute: this.mute,
        age: this.age,
        studies: this.studies,
      });
    }
  }

  ngOnInit(): void {
    if (this.profileId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        ProfileAction.getProfileById({ profileId: this.profileId })
      );
    } else {
      this.profileForm.reset();
    }
    if (this.profile) {
      console.log(this.profileId);
      if (this.profileId) {
        this.profileService.getProfileId(this.profileId).subscribe(
          (profile: ProfileDTO) => {
            this.profile = profile;
            console.log('this.profileId');

            console.log(this.profileId);
            console.log(this.profile);
          },
          (error: HttpErrorResponse) => {
            this.errorResponse = error.error;
          }
        );
      }
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
