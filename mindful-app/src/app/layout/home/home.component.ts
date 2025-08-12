import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRIMENG_IMPORTS } from 'src/app/shared/primeng.imports';

@Component({
  selector: 'app-home',
  imports: [PRIMENG_IMPORTS, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
