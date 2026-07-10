import {
  Injectable,
  computed,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly activeRequestsSignal = signal(0);

  readonly isLoading = computed(
    () => this.activeRequestsSignal() > 0
  );

  show(): void {
    this.activeRequestsSignal.update(
      (count) => count + 1
    );
  }

  hide(): void {
    this.activeRequestsSignal.update(
      (count) => Math.max(0, count - 1)
    );
  }

  reset(): void {
    this.activeRequestsSignal.set(0);
  }
}
