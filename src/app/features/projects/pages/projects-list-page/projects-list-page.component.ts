import { Component } from '@angular/core';
import { Project } from '../../../../core/project/project';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';

@Component({
  selector: 'app-projects-list-page',
  imports: [BasicLayoutComponent, ProjectCardComponent],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss'
})
export class ProjectsListPageComponent {
  projects: Project[] = Array.from({ length: 5 }, (_, i) => {
    const name = faker.company.name();
    return {
      id: faker.string.uuid(),
      name,
      slug: slugify(name),
      image: faker.image.url({ height: 600, width: 800 }),
      shortDescription: faker.lorem.sentence(20),
      description: faker.lorem.paragraph(5),
      voteCounter: faker.number.int({ min: 0, max: 100 }),
      creatorId: faker.string.uuid(),
      creatorName: faker.person.fullName(),
      creatorImage: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    };
  });
}
