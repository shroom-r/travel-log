import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-user-init',
  templateUrl: './user-init.component.html',
  styleUrls: ['./user-init.component.scss']
})
export class UserInitComponent implements OnInit {
  constructor(private readonly userApi: UserApiService) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.userApi.loadAllUsers$().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
  }
}