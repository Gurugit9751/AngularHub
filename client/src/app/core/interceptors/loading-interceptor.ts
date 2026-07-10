import {
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { finalize } from 'rxjs';

import { environment } from '../../../environment/environment';

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const loadingService = inject(LoadingService);

  /*
   * Show the global loader only for backend API requests.
   * Assets, images and external URLs are ignored.
   */
  if (!request.url.startsWith(environment.apiUrl)) {
    return next(request);
  }

  loadingService.show();

  return next(request).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
