import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original string if its length is less than or equal to the limit', () => {
    const input = 'Hello';
    const result = pipe.transform(input, 10);
    expect(result).toBe('Hello');
  });

  it('should truncate the string and add ".." if its length exceeds the limit', () => {
    const input = 'This is a very long string';
    const result = pipe.transform(input, 10);
    expect(result).toBe('This is a ..');
  });

  it('should truncate with default limit of 14 when no limit is provided', () => {
    const input = 'This is a long sentence that should be truncated';
    const result = pipe.transform(input);
    expect(result).toBe('This is a long ..');
  });

  it('should handle empty string correctly', () => {
    const input = '';
    const result = pipe.transform(input, 10);
    expect(result).toBe('');
  });

  it('should handle limit of 0 and return ".."', () => {
    const input = 'Test';
    const result = pipe.transform(input, 0);
    expect(result).toBe('..');
  });

  it('should return correct result when string length equals the limit', () => {
    const input = 'ExactLength';
    const result = pipe.transform(input, 11);
    expect(result).toBe('ExactLength');
  });
});
