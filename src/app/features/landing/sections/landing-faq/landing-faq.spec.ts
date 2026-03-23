import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingFaq } from './landing-faq';

describe('LandingFaq', () => {
  let component: LandingFaq;
  let fixture: ComponentFixture<LandingFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingFaq],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show limited questions initially', () => {
    expect(component.faq().length).toBe(component.initialQuestionsCount);
  });

  it('should show all questions after toggleShowAll', () => {
    component.toggleShowAll();
    expect(component.showAllQuestions()).toBeTrue();
    expect(component.faq().length).toBe(component.totalQuestionsCount);
  });

  it('should toggle back to limited questions', () => {
    component.toggleShowAll();
    component.toggleShowAll();
    expect(component.showAllQuestions()).toBeFalse();
    expect(component.faq().length).toBe(component.initialQuestionsCount);
  });

  it('should filter questions by search query', () => {
    component.searchQuery.set('registr');
    const results = component.faq();
    expect(results.length).toBeGreaterThan(0);
    results.forEach((item) => {
      const matches =
        item.title.toLowerCase().includes('registr') ||
        item.description.toLowerCase().includes('registr');
      expect(matches).toBeTrue();
    });
  });

  it('should return empty array for non-matching search', () => {
    component.searchQuery.set('xyznonexistent');
    expect(component.faq().length).toBe(0);
  });

  it('should clear search query', () => {
    component.searchQuery.set('test');
    component.clearSearch();
    expect(component.searchQuery()).toBe('');
  });

  it('should set search option', () => {
    const option = { displayText: 'Test', searchText: 'test', count: 5, importance: 1 };
    component.setSearchOption(option);
    expect(component.searchQuery()).toBe('test');
  });

  it('should compute hiddenQuestionsCount correctly', () => {
    expect(component.hiddenQuestionsCount).toBe(
      component.totalQuestionsCount - component.initialQuestionsCount,
    );
  });

  it('should populate searchOptions on init', () => {
    expect(component.searchOptions.length).toBeGreaterThan(0);
    expect(component.searchOptions.length).toBeLessThanOrEqual(6);
  });
});
