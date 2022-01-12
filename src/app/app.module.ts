import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsArray } from './app.reducers';
import { AddProfileComponent } from './components/Profile/add-profile/add-profile.component';
import { ProfileListComponent } from './components/Profile/profile-list/profile-list.component';
import { ProfilePageComponent } from './components/Profile/profile-page/profile-page.component';
import { profilesReducer } from './components/Profile/reducer';
import { FilterProfilePipe } from './pipe/filter-profile.pipe';
import { HeaderComponent } from './components/Header/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    ProfileListComponent,
    AddProfileComponent,
    FilterProfilePipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    StoreModule.forRoot({ profile: profilesReducer }),
    EffectsModule.forRoot(EffectsArray),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
