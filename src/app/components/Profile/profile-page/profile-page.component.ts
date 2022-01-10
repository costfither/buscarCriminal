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

  private isUpdateMode: boolean;
  private profileId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.profileId = this.activatedRoute.snapshot.paramMap.get('profileID');
    this.profile = new ProfileDTO('');
    this.isUpdateMode = false;

    this.name = new FormControl(this.profile.name, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.surname1 = new FormControl(this.profile.surname1, [
      Validators.required,
      Validators.maxLength(255),
    ]);
    this.surname2 = new FormControl(this.profile.surname2, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new FormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.categories = new FormControl([]);

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('categories').subscribe((categories) => {
      this.categoriesList = categories.categories;
    });

    this.store.select('posts').subscribe((posts) => {
      this.post = posts.post;

      this.title.setValue(this.post.title);

      this.description.setValue(this.post.description);

      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );

      if (this.post.categories) {
        let categoriesIds: string[] = [];
        this.post.categories.forEach((cat: CategoryDTO) => {
          categoriesIds.push(cat.categoryId);
        });

        this.categories.setValue(categoriesIds);
      }

      this.postForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        publication_date: this.publication_date,
        categories: this.categories,
      });
    });

    this.loadCategories();
  }

  ngOnInit(): void {}
}
