import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
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
  weight: FormControl; //pes
  dateBorn: FormControl; //data de naixement
  tattooNumber: FormControl; //numero de tatuatges
  surname2: FormControl; //segon cognom
  ethnic_characteristics: FormControl; // caracteristiques etniques
  height: FormControl; //alçada
  eyeColor: FormControl; //color dels ulls
  deaf: FormControl; //sord
  lackExtremitats: FormControl; //falta de extremitats
  mute: FormControl; //si es mud
  footNumber: FormControl; //numero de peu
  surname1: FormControl; //primer cognom;
  age: FormControl; //edat
  studies: FormControl; //llistat d'estudis

  profileForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private profileId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.profileId = this.activatedRoute.snapshot.paramMap.get('profileID');
  }

  ngOnInit(): void {}
}
