import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDTO } from '../components/Profile/models/profile.dto';

interface deleteResponse {
  affected: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private link: string;
  constructor(private http: HttpClient) {
    this.link =
      'https://japnuaox4h.execute-api.eu-north-1.amazonaws.com/buscaProfile_v1';
  }

  getAllProfile(): Observable<ProfileDTO[]> {
    return this.http.get<ProfileDTO[]>(this.link);
  }

  getProfileId(id: string): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(this.link + id);
  }

  createProfile(profile: ProfileDTO): Observable<ProfileDTO> {
    return this.http.post<ProfileDTO>(this.link, profile);
  }

  deleteProfile(profileID: string): Observable<deleteResponse> {
    return this.http.delete<deleteResponse>(
      this.link + '/profile/?profileID=' + profileID
    );
  }
}
