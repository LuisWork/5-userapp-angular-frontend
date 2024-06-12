import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Luis',
      lastname: 'Zambrano',
      email: 'luis@correo.com',
      username: 'Radyk',
      password: '123456'
    },
    {
      id: 2,
      name: 'Josefa',
      lastname: 'Doe',
      email: 'pepa@correo.com',
      username: 'Pepa',
      password: '123456'
    },
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
