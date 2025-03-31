import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/project/project';
import { faker } from '@faker-js/faker';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectCardNewComponent } from '../../../../shared/ui/project-card-new/project-card-new.component';

@Component({
  selector: 'app-landing-projects',
  imports: [RouterLink, ProjectCardComponent, ProjectCardNewComponent],
  templateUrl: './landing-projects.component.html',
  styleUrl: './landing-projects.component.css'
})
export class LandingProjectsComponent {
  projects: Project[] = [
    {
      id: faker.string.uuid(),
      name: 'Noteworthy technology acquisitions 2021',
      slug: 'noteworthy-technology-acquisitions-2021',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-1.jpg',
      shortDescription: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. They include some of the biggest names in tech, such as Microsoft, Salesforce, and Oracle.',
      voteCounter: faker.number.int({ min: 0, max: 100 }),
      createdAt: faker.date.past(),
      creatorName: faker.person.fullName(),
      creatorImage: faker.image.avatar(),
      updatedAt: faker.date.past(),
      creatorId: faker.string.uuid(),
    },
    {
      id: faker.string.uuid(),
      name: 'Noteworthy technology acquisitions 2022',
      slug: 'noteworthy-technology-acquisitions-2022',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-4.jpg',
      shortDescription: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.',
      description: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order. They include some of the biggest names in tech, such as Microsoft, Salesforce, and Oracle.',
      voteCounter: faker.number.int({ min: 0, max: 100 }),
      createdAt: faker.date.past(),
      creatorName: faker.person.fullName(),
      creatorImage: faker.image.avatar(),
      updatedAt: faker.date.past(),
      creatorId: faker.string.uuid(),
    },
  ];
}
