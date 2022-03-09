import { Component, OnInit } from '@angular/core';
import { GenesysCloudService } from '../genesys-cloud.service';
import { Observable, Subject, merge, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';
import * as platformClient from 'purecloud-platform-client-v2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // userDetails?: platformClient.Models.UserMe;
  // userAvatar: string = 'assets/default-face.png';
  searchTerm = new BehaviorSubject<string>('');
  users$!: Observable<platformClient.Models.User[]>
  customer$!: Observable<platformClient.Models.ExternalContact>;
  fetching = false;

  constructor(private genesysCloudService: GenesysCloudService) {
  }

  ngOnInit(): void {
  //  this.getUserDetails();

  this.customer$ = this.searchTerm.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => { this.fetching = true; }),
    switchMap((id: string) => this.genesysCloudService.searchCustomers(id)),
    // switchMap((term: string) => this.genesysCloudService.searchUsers(term)),
    tap(() => { this.fetching = false; })
  );

  // Set the last searched term
  this.searchTerm.subscribe(id => {
    if(id) this.genesysCloudService.lastUserSearchValue = id;
  });

  // If there is a previoulsy searched term, display the results
  if(this.genesysCloudService.lastUserSearchValue){
    this.searchTerm.next(this.genesysCloudService.lastUserSearchValue);
  }
}

searchUser(term: string): void {
  this.searchTerm.next(term);
}

searchCustomer(id: string): void {
  this.searchTerm.next(id);
}

  // getUserDetails(){
  //   this.genesysCloudService.getUserMe()
  //     .subscribe(userDetails => {
  //       this.userDetails = userDetails
  //       this.userAvatar = userDetails.images?.[userDetails.images.length - 1]
  //                         .imageUri || this.userAvatar;
  //     });
  // }
}
