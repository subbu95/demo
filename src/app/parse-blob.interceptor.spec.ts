import { parseBlobInterceptor } from './parse-blob-interceptor';
import { HttpClient, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('parseBlobInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([parseBlobInterceptor]))
      ]
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should pass through non-blob errors untouched', (done) => {
    http.get('/api/test').subscribe({
      next: () => fail('Should have thrown an error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Something went wrong' });
        done();
      }
    });

    const req = controller.expectOne('/api/test');
    req.flush({ message: 'Something went wrong' }, { status: 500, statusText: 'Server Error' });
  });

  it('should parse JSON Blob error and reject with parsed object', (done) => {
    const errorObj = { status: { errors: [{ code: '123', message: 'Parsed blob error' }] } };
    const blob = new Blob([JSON.stringify(errorObj)], { type: 'application/json' });

    // Patch FileReader for testability
    spyOn(window as any, 'FileReader').and.returnValue({
      readAsText: function () {
        this.onload({ target: { result: JSON.stringify(errorObj) } });
      },
      onload: null,
      onerror: null
    });

    http.get('/api/blob-error').subscribe({
      next: () => fail('Should have errored out'),
      error: (err: HttpErrorResponse) => {
        expect(err.error).toEqual(errorObj);
        expect(err.status).toBe(400);
        expect(err.statusText).toBe('Bad Request');
        done();
      }
    });

    const req = controller.expectOne('/api/blob-error');
    req.flush(blob, {
      status: 400,
      statusText: 'Bad Request',
    });
  });

  it('should fall back to original error if JSON.parse fails', (done) => {
    const invalidBlob = new Blob(['invalid json'], { type: 'application/json' });

    spyOn(window as any, 'FileReader').and.returnValue({
      readAsText: function () {
        this.onload({ target: { result: 'not valid json' } });
      },
      onload: null,
      onerror: null
    });

    http.get('/api/blob-invalid').subscribe({
      next: () => fail('Should have errored'),
      error: (err: HttpErrorResponse) => {
        expect(err.error instanceof Blob).toBeTrue();
        done();
      }
    });

    const req = controller.expectOne('/api/blob-invalid');
    req.flush(invalidBlob, { status: 400, statusText: 'Bad Request' });
  });

  it('should fall back to original error if FileReader errors out', (done) => {
    const blob = new Blob(['irrelevant'], { type: 'application/json' });

    spyOn(window as any, 'FileReader').and.returnValue({
      readAsText: function () {
        this.onerror('error event');
      },
      onload: null,
      onerror: null
    });

    http.get('/api/blob-error').subscribe({
      next: () => fail('Should error out'),
      error: (err: HttpErrorResponse) => {
        expect(err.error instanceof Blob).toBeTrue();
        done();
      }
    });

    const req = controller.expectOne('/api/blob-error');
    req.flush(blob, { status: 400, statusText: 'Bad Request' });
  });
});
