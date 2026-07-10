import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  inject,
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { NAVIGATION_ITEMS } from '../../core/data/navigation.data';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly authService = inject(AuthService);

  @Output()
  readonly navigationSelected = new EventEmitter<void>();

  readonly visibleNavigationItems = computed(() => {
    /*
     * Register the current-user signal as a dependency.
     */
    this.authService.currentUser();

    return NAVIGATION_ITEMS.filter((item) => this.authService.hasPermission(item.permission));
  });

  onNavigationSelected(): void {
    this.navigationSelected.emit();
  }
}
