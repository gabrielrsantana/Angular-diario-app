import { AuthService } from '../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}

  user$?: Observable<any>;
  user: any;

  routerEventSubscription!: Subscription;
  currentRoute: string = '/';
  isMenuCollapsed: boolean = true;

  toggle() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  close() {
    this.isMenuCollapsed = true;
  }

  logout() {
    this.close();
    this.authService.logout();
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.currentRoute = ev.url;
      }
    });

    this.user$ = this.authService.user;
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
}