import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectCard } from './project-card';
import { Project } from '../../../core/project/project';
import { ProjectStatus } from '../../../core/project/project-status';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  const mockProject: Project = {
    id: '1',
    slug: 'test',
    name: 'Test',
    shortDescription: 'desc',
    description: 'full desc',
    image: '',
    status: ProjectStatus.Voting,
    totalVoters: 0,
    totalVotes: 0,
    isBanned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    creator: { id: '1', fullName: 'Test', imageUrl: '', gravatar: '' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('project', mockProject);
    componentRef.setInput('supported', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
