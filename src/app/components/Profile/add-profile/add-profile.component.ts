import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDTO } from '../models/profile.dto';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  addProfile: ProfileDTO;
  profileID: string = '0';
  addoperation: string = '';

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
  operation: FormControl; //operacions

  addProfileForm: FormGroup;
  isValidForm: boolean | null;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _store: Store<AppState>,
    private profileService: ProfileService
  ) {
    let errorResponse: any;

    this.addProfile = new ProfileDTO('');

    this.isValidForm = null;
    this.profileService.getAllProfile().subscribe(
      (profiles: ProfileDTO[]) => {
        profiles.map((profile) => {
          if (parseInt(this.profileID) <= parseInt(profile.profileID)) {
            this.profileID = profile.profileID;
          }
        });
        let id = parseInt(this.profileID) + 1;
        this.profileID = id.toString();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
      }
    );
    this.name = new FormControl(this.addProfile.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.surname1 = new FormControl(this.addProfile.surname1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.surname2 = new FormControl(this.addProfile.surname2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.hairColor = new FormControl(this.addProfile.hairColor, [
      Validators.maxLength(50),
    ]);
    this.skinColor = new FormControl(this.addProfile.skinColor, [
      Validators.maxLength(50),
    ]);
    this.eyeColor = new FormControl(this.addProfile.eyeColor, [
      Validators.maxLength(100),
    ]);
    this.ethnic_characteristics = new FormControl(
      this.addProfile.ethnic_characteristics,
      [Validators.maxLength(100)]
    );
    this.scars = new FormControl(this.addProfile.scars);
    this.constitution = new FormControl(this.addProfile.constitution, [
      Validators.maxLength(100),
    ]);
    this.bornLocation = new FormControl(this.addProfile.bornLocation, [
      Validators.maxLength(250),
    ]);
    this.dateBorn = new FormControl(this.addProfile.dateBorn, [
      Validators.maxLength(100),
    ]);
    this.deaf = new FormControl(this.addProfile.deaf);
    this.lackExtremitats = new FormControl(this.addProfile.lackExtremitats);
    this.mute = new FormControl(this.addProfile.mute);
    this.studies = new FormControl(this.addProfile.studies);
    this.operations = new FormControl(this.addProfile.operation);
    this.operation = new FormControl(this.addoperation);
    this.addProfileForm = this.formBuilder.group({
      name: this.name,
      surname1: this.surname1,
      surname2: this.surname2,
      hairColor: this.hairColor,
      skinColor: this.skinColor,
      eyeColor: this.eyeColor,
      ethnic_characteristics: this.ethnic_characteristics,
      scars: this.scars,
      constitution: this.constitution,
      bornLocation: this.bornLocation,
      dateBorn: this.dateBorn,
      deaf: this.deaf,
      lackExtremitats: this.lackExtremitats,
      mute: this.mute,
      studies: this.studies,
      operations: this.operations,
    });
  }

  ngOnInit(): void {}

  addprofile() {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.addProfileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.addProfile = this.addProfileForm.value;
    console.log(this.addProfileForm.value);
    this.addProfile.profileID = this.profileID;
    this.profileService.createProfile(this.addProfile).subscribe((profile) => {
      console.log(profile);
    });
  }

  addOperation() {
    if (this.addoperation != '') {
      this.addProfile.operation.join(this.addoperation);
    }
  }
}
