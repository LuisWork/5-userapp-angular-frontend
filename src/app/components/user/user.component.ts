import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  
  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();

  @Output() selectedUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    const confirmRemove = confirm('Estas seguro que desea eliminar?');

    if (confirmRemove) {
      this.idUserEventEmitter.emit(id);
    }
  }

  onSelectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }
}
