import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('returns a lesson by stable id', () => {
    const lesson = service.getLessonById('l5-components');
    expect(lesson?.title).toContain('المكوّن');
  });

  it('keeps unique lesson ids', () => {
    const ids = service.getLessons().map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('orders adjacent lessons across a level', () => {
    const { next } = service.getAdjacentLessons('l0-computer');
    expect(next?.id).toBe('l0-files');
  });

  it('searches Arabic titles', () => {
    const result = service.search('Flexbox');
    expect(result.lessons.some((lesson) => lesson.id === 'l2-flex')).toBeTrue();
  });

  it('has a healthy catalog', () => {
    expect(service.validateCatalog()).toEqual([]);
  });

  it('covers all eleven levels with lessons', () => {
    for (const level of service.getLevels()) {
      expect(service.getLessonsByLevel(level.id).length).toBeGreaterThan(0);
    }
  });

  it('gives HTML and CSS lessons real teaching length', () => {
    const web = service.getLessonsByLevel('level-2');
    expect(web.length).toBeGreaterThanOrEqual(16);
    for (const lesson of web) {
      const text = lesson.sections.map((section) => section.body ?? '').join(' ');
      expect(text.length).withContext(lesson.id).toBeGreaterThan(280);
      expect(lesson.sections.length).withContext(lesson.id).toBeGreaterThan(2);
    }
  });
});
