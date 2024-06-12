import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  users: User[] = [];
  userSelected: User;

  constructor(private service: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User) {
    console.log(user);
    if (user.id > 0) {
      this.showCreateAlert();
      this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
    } else {
      this.showCreateAlert();
      this.users = [...this.users, { ...user, id: new Date().getTime() }];
    }
    this.userSelected = new User();
  }

  removeUser(id: number): void {
    this.users = this.users.filter((user) => user.id != id);
    this.showRemoveAlert();
  }

  setSelectedUser(userRow: User): void {
    this.userSelected = { ...userRow };
  }

  showCreateAlert(): void {
    Swal.fire({
      title: 'Usuario guardado! 😊',
      icon: 'success',
    });
  }

  showRemoveAlert(): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminemos el usuario!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado!',
          text: 'Este usuario a sido eliminado. 🚮',
          icon: 'success',
        });
      }
    });
  }
}
