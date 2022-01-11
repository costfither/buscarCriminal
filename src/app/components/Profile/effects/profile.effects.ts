import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import * as ProfileAction from '../actions';

@Injectable()
export class ProfileEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
    this.responseOK = false;
  }
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileAction.deleteProfile),
      exhaustMap(({ profileId }) =>
        this.profileService.deleteProfile(profileId).pipe(
          map(() => {
            return ProfileAction.deleteProfileSuccess({
              profileId: profileId,
            });
          }),
          catchError((error) => {
            return of(ProfileAction.deleteProfileFailure({ payload: error }));
          })
        )
      )
    )
  );

  deletePostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileAction.deleteProfileFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getProfileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileAction.getProfileById),
      exhaustMap(({ profileId }) =>
        this.profileService.getProfileId(profileId).pipe(
          map((profile) => {
            return ProfileAction.getProfileByIdSuccess({
              profile: profile.find(
                (profile) => profile.profileID == profileId
              ),
            });
          }),
          catchError((error) => {
            return of(ProfileAction.getProfileByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getProfileByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileAction.getProfileByIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  createProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileAction.createProfile),
      exhaustMap(({ profile }) =>
        this.profileService.createProfile(profile).pipe(
          map((profile) => {
            return ProfileAction.createProfileSuccess({
              profile: profile,
            });
          }),
          catchError((error) => {
            return of(ProfileAction.createProfileFailure({ payload: error }));
          })
        )
      )
    )
  );

  createProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileAction.createProfileSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileAction.createProfileFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileAction.getAllProfiles),
      exhaustMap(() =>
        this.profileService.getAllProfile().pipe(
          map((profiles) => {
            console.log(profiles);
            return ProfileAction.getAllProfilesSuccess({
              profiles: profiles,
            });
          }),
          catchError((error) => {
            return of(ProfileAction.getAllProfilesFailure({ payload: error }));
          })
        )
      )
    )
  );

  getPostsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileAction.getAllProfilesFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );
}
