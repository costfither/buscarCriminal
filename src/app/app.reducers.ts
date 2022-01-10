import { ActionReducerMap } from '@ngrx/store';
import { ProfileEffects } from './components/Profile//effects/profile.effects';
import * as ProfileReducer from './components/Profile/reducer';

export interface AppState {
  profiles: ProfileReducer.ProfileState;
}

export const appReducers: ActionReducerMap<AppState> = {
  profiles: ProfileReducer.profilesReducer,
};

export const EffectsArray: any[] = [ProfileEffects];
