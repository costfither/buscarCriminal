import { Component, OnInit } from '@angular/core';
import { ProfileDTO } from '../models/profile.dto';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profile: ProfileDTO;
  : FormControl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
