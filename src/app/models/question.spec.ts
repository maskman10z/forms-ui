import { Question } from './question';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question("A", "B", null)).toBeTruthy();
  });
});
