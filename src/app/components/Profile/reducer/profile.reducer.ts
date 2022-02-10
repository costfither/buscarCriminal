import { Action, createReducer, on } from '@ngrx/store';
import {
  createProfile,
  createProfileFailure,
  createProfileSuccess,
  deleteProfile,
  deleteProfileFailure,
  deleteProfileSuccess,
  editProfile,
  editProfileFailure,
  editProfileSuccess,
  getAllProfiles,
  getAllProfilesFailure,
  getAllProfilesSuccess,
  getProfileById,
  getProfileByIdFailure,
  getProfileByIdSuccess,
} from '../actions';
import { ProfileDTO } from '../models/profile.dto';

export interface ProfileState {
  profiles: ProfileDTO[];
  profile: ProfileDTO | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProfileState = {
  profiles: new Array<ProfileDTO>(),
  profile: new ProfileDTO(''),
  loading: false,
  loaded: false,
  error: null,
};

const _profilesReducer = createReducer(
  initialState,
  on(getAllProfiles, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAllProfilesSuccess, (state, action) => ({
    ...state,
    profiles: action.profiles,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAllProfilesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(deleteProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteProfileSuccess, (state, { profileId }) => ({
    ...state,
    posts: [
      ...state.profiles.filter((profile) => profile.profileID !== profileId),
    ],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProfileById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProfileByIdSuccess, (state, action) => ({
    ...state,
    profile: action.profile,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProfileByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(createProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createProfileSuccess, (state, action) => ({
    ...state,
    profile: action.profile,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(editProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(editProfileSuccess, (state, action) => ({
    ...state,
    profile: action.profile,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(editProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function profilesReducer(
  state: ProfileState | undefined,
  action: Action
): ProfileState {
  return _profilesReducer(state, action);
}
