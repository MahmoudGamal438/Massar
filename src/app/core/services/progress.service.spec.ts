import { TestBed } from '@angular/core/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressService);
  });

  it('does not treat opening a lesson as completion', () => {
    service.openLesson('l0-computer');
    expect(service.isLessonComplete('l0-computer')).toBeFalse();
    expect(service.progress().openedLessons).toContain('l0-computer');
  });

  it('requires a passed quiz before completing a lesson that has one', () => {
    expect(service.canCompleteLesson('l0-computer')).toBeFalse();
    service.recordQuiz({
      quizId: 'q-l0-computer',
      score: 2,
      total: 2,
      passed: true,
      at: new Date().toISOString(),
    });
    service.completeExercise('ex-l0-path');
    expect(service.canCompleteLesson('l0-computer')).toBeTrue();
  });

  it('unlocks level 0 and locks later levels until the threshold', () => {
    expect(service.isLevelUnlocked('level-0')).toBeTrue();
    expect(service.isLevelUnlocked('level-1')).toBeFalse();
  });
});
