import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ProfileDTO } from '../models/profile.dto';

export const deleteProfile = createAction(
  '[ProfileForm Page] Delete profile',
  props<{ profileId: string }>()
);
export const deleteProfileSuccess = createAction(
  '[ProfileForm Page] Delete profile Success',
  props<{ profileId: string }>()
);
export const deleteProfileFailure = createAction(
  '[ProfileForm Page] Delete profile Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getProfileById = createAction(
  '[ProfileForm Page] Get profile',
  props<{ profileId: string }>()
);
export const getProfileByIdSuccess = createAction(
  '[ProfileForm Page] Get profile Success',
  props<{ profile: ProfileDTO | undefined }>()
);
export const getProfileByIdFailure = createAction(
  '[ProfileForm Page] Get profile Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createProfile = createAction(
  '[ProfileForm Page] Create profile',
  props<{ profile: ProfileDTO }>()
);
export const createProfileSuccess = createAction(
  '[ProfileForm Page] Create profile Success',
  props<{ profile: ProfileDTO }>()
);
export const createProfileFailure = createAction(
  '[ProfileForm Page] Create profile Failure',
  props<{ payload: HttpErrorResponse }>()
);
export const editProfile = createAction(
  '[ProfileForm Page] Edit profile',
  props<{ profile: ProfileDTO }>()
);
export const editProfileSuccess = createAction(
  '[ProfileForm Page] Edit profile Success',
  props<{ profile: ProfileDTO }>()
);
export const editProfileFailure = createAction(
  '[ProfileForm Page] Edit profile Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getAllProfiles = createAction(
  '[ProfileList Page] Get profile list'
);
export const getAllProfilesSuccess = createAction(
  '[ProfileList Page] Get profile list Success',
  props<{ profiles: ProfileDTO[] }>()
);

export const getAllProfilesFailure = createAction(
  '[ProfileList Page] Get profile list Failure',
  props<{ payload: HttpErrorResponse }>()
);
