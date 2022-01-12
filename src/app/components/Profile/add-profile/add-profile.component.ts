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
import { createProfile } from '../actions';
import { ProfileDTO } from '../models/profile.dto';
import { ProfileState } from '../reducer';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  addProfile: ProfileDTO;

  name: FormControl;
  surname1: FormControl;
  surname2: FormControl;

  addProfileForm: FormGroup;
  isValidForm: boolean | null;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _store: Store<AppState>
  ) {
    this.addProfile = new ProfileDTO('');

    this.isValidForm = null;

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

    this.addProfileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname1,
      surname_2: this.surname2,
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

    this._store.dispatch(createProfile({ profile: this.addProfile }));
    this._store.select('profiles').subscribe(async (profile: ProfileState) => {
      if (profile.error) {
        responseOK = false;
        errorResponse = profile.error;
      } else {
        responseOK = true;
      }
      if (responseOK) {
        //reset the form
        this.addProfileForm.reset();
      }
    });
  }
}
