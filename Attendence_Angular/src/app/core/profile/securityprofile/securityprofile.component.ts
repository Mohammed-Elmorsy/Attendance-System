import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-securityprofile',
  templateUrl: './securityprofile.component.html',
  styleUrls: ['./securityprofile.component.css']
})
export class SecurityprofileComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
