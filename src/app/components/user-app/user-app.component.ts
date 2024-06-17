import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find((user) => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        this.service.update(user).subscribe((userUpdated) => {
          this.users = this.users.map((u) =>
            u.id == userUpdated.id ? { ...userUpdated } : u
          );
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      } else {
        this.service.create(user).subscribe((userNew) => {
          this.users = [...this.users, { ...userNew }];
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      }

      this.showCreateAlert();
    });
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe((id) => {
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
          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id != id);
            this.router
              .navigate(['/users/create'], { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/users'], {
                  state: { users: this.users },
                });
              });
          });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Este usuario a sido eliminado. 🚮',
            icon: 'success',
          });
        }
      });
    });
  }

  showCreateAlert(): void {
    Swal.fire({
      title: 'Usuario guardado! 😊',
      icon: 'success',
    });
  }
}
