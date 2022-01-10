import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProfileComponent } from './components/Profile/add-profile/add-profile.component';
import { ProfileListComponent } from './components/Profile/profile-list/profile-list.component';
import { ProfilePageComponent } from './components/Profile/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: ProfileListComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: '**', component: ProfileListComponent },
  { path: 'profile/add', component: AddProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
