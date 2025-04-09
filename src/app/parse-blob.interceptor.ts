import { HttpInterceptorFn } from '@angular/common/http';

export const parseBlobInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
