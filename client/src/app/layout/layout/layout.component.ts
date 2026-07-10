import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  showSidebar = false;

  constructor(private router: Router) {
    // Initial page load
    this.updateSidebar(this.router.url);

    // On every navigation
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateSidebar(this.router.url);
    });
  }

  private updateSidebar(url: string): void {
    this.showSidebar =
      url.startsWith('/docs/introduction') ||
      url.startsWith('/docs/angular') ||
      url.startsWith('/docs/rxjs') ||
      url.startsWith('/docs/material') ||
      url.startsWith('/docs/api');
  }
}
