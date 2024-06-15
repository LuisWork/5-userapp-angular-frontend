import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  user: User;

  constructor(private router: Router, private sharingData: SharingDataService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new User();
    }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
    }

    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    userForm.reset();
  }
}
