import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProfileDTO } from '../components/Profile/models/profile.dto';
interface deleteResponse {
  affected: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private link: string;

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) {
    this.link =
      'https://japnuaox4h.execute-api.eu-north-1.amazonaws.com/buscaProfile_v1/profile';
  }

  private data: any = [];
  getAllProfile(): Observable<ProfileDTO[]> {
    return this.http.get<ProfileDTO[]>(this.link, {
      headers: this.httpOptions,
    });
  }

  getProfileId(id: string): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(this.link + '?profileID=' + id, {
      headers: this.httpOptions,
    });
  }

  createProfile(profile: ProfileDTO): Observable<ProfileDTO> {
    return this.http.post<ProfileDTO>(this.link, {
      headers: this.httpOptions,
      profile,
    });
  }

  deleteProfile(profileID: string): Observable<deleteResponse> {
    return this.http.delete<deleteResponse>(
      this.link + '?profileID=' + profileID,
      { headers: this.httpOptions }
    );
  }
  processError(err: { error: { message: string }; status: any; message: any }) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
