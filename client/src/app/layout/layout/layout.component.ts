import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { RouterOutlet } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

import { HeaderComponent } from '../header/header.component';
import { Sidebar } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, Sidebar],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 959px)').pipe(map((result) => result.matches)),
    {
      initialValue: false,
    },
  );

  closeSidebarOnMobile(sidenav: MatSidenav): void {
    if (this.isMobile()) {
      void sidenav.close();
    }
  }
}
