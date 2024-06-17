import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  title = 'Listado de Usuarios';

  users: User[] = [];

  constructor(
    private sharingData: SharingDataService,
    private service: UserService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
    if (
      this.users == undefined ||
      this.users == null ||
      this.users.length == 0
    ) {
      this.service.findAll().subscribe((users) => (this.users = users));
    }
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }
}
