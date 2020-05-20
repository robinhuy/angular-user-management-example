import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      name: "Nanette MacDearmaid",
      email: "nmacdearmaid0@ucla.edu",
      birthday: "11/18/1995",
      avatar:
        "https://robohash.org/faceresintblanditiis.bmp?size=150x150&set=set1",
    },
    {
      id: 2,
      name: "Chancey Di Maria",
      email: "cdi1@simplemachines.org",
      birthday: "4/4/2008",
      avatar:
        "https://robohash.org/modiinventoremolestias.png?size=150x150&set=set1",
    },
    {
      id: 3,
      name: "Catherine Waberer",
      email: "cwaberer2@umn.edu",
      birthday: "12/2/2002",
      avatar:
        "https://robohash.org/dolortemporibussoluta.png?size=150x150&set=set1",
    },
  ];

  getUsers(): User[] {
    return this.users;
  }
}
