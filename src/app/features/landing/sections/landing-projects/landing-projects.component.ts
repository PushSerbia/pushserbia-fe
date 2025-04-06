import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/project/project';
import { faker } from '@faker-js/faker';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectCardNewComponent } from '../../../../shared/ui/project-card-new/project-card-new.component';
import { ProjectStatus } from '../../../../core/project/project-status';

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
      totalVoters: faker.number.int({ min: 0, max: 100 }),
      totalVotes: faker.number.int({ min: 0, max: 100 }),
      creator: {
        id: faker.string.uuid(),
        fullName: faker.person.fullName(),
        image: faker.image.avatar(),
      },
      status: ProjectStatus.InProgress,
      isBanned: false,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
    {
      id: faker.string.uuid(),
      name: 'Noteworthy technology acquisitions 2022',
      slug: 'noteworthy-technology-acquisitions-2022',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-4.jpg',
      shortDescription: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.',
      description: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order. They include some of the biggest names in tech, such as Microsoft, Salesforce, and Oracle.',
      totalVoters: faker.number.int({ min: 0, max: 100 }),
      totalVotes: faker.number.int({ min: 0, max: 100 }),
      creator: {
        id: faker.string.uuid(),
        fullName: faker.person.fullName(),
        image: faker.image.avatar(),
      },
      status: ProjectStatus.InProgress,
      isBanned: false,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
  ];
}
