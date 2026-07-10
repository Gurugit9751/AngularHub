import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  signal,
} from '@angular/core';

import { AppPermission } from '../../core/constants/role-permissions.constant';

import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  private readonly authService = inject(AuthService);

  private readonly templateRef = inject(TemplateRef<unknown>);

  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly permissionSignal = signal<AppPermission | null>(null);

  private isRendered = false;

  @Input()
  set appHasPermission(permission: AppPermission) {
    this.permissionSignal.set(permission);
  }

  constructor() {
    effect(() => {
      /*
       * Register current user as a reactive dependency.
       */
      this.authService.currentUser();

      const permission = this.permissionSignal();

      const allowed = permission !== null && this.authService.hasPermission(permission);

      this.updateView(allowed);
    });
  }

  private updateView(allowed: boolean): void {
    if (allowed && !this.isRendered) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);

      this.isRendered = true;
      return;
    }

    if (!allowed && this.isRendered) {
      this.viewContainerRef.clear();
      this.isRendered = false;
    }
  }
}
