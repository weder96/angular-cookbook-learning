import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() index: number;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!window['appLogs']) {
      window['appLogs'] = {};
    }
    if (!window['appLogs'][this.user.email]) {
      window['appLogs'][this.user.email] = 0;
    }
  }

  cardClicked() {
    this.router.navigate([`/users/${this.user.login.uuid}`]);
  }

  createUniqueId(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  idUsingFactorial(num, length = 1) {
    window['appLogs'][this.user.email]++;
    if (num === 1) {
      return this.createUniqueId(length);
    } else {
      const fact = length * (num - 1);
      return this.idUsingFactorial(num - 1, fact);
    }
  }
}
