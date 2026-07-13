import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface TechnologyCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly route: string;
  readonly className: string;
}

interface FeatureCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly technologies: readonly TechnologyCard[] = [
    {
      title: 'HTML',
      description: 'Learn semantic markup, forms, tables, media and modern HTML structure.',
      icon: 'code',
      route: '/docs/html/introduction',
      className: 'html-card',
    },
    {
      title: 'JavaScript',
      description: 'Master variables, functions, arrays, promises, closures and modern ES6.',
      icon: 'javascript',
      route: '/docs/javascript/introduction',
      className: 'javascript-card',
    },
    {
      title: 'Angular',
      description: 'Explore components, routing, services, signals, forms, guards and RxJS.',
      icon: 'change_history',
      route: '/docs/angular/introduction',
      className: 'angular-card',
    },
    {
      title: 'Node.js',
      description: 'Build scalable APIs using modules, Express, middleware and authentication.',
      icon: 'dns',
      route: '/docs/node/introduction',
      className: 'node-card',
    },
    {
      title: 'MongoDB',
      description: 'Understand collections, CRUD operations, aggregation, indexes and Mongoose.',
      icon: 'storage',
      route: '/docs/mongodb/introduction',
      className: 'mongodb-card',
    },
  ];

  readonly features: readonly FeatureCard[] = [
    {
      title: 'Structured Learning',
      description:
        'Topics are organized into clear sections so you can learn concepts in the correct order.',
      icon: 'account_tree',
    },
    {
      title: 'Practical Examples',
      description:
        'Each topic is designed to include real-world explanations and reusable code examples.',
      icon: 'terminal',
    },
    {
      title: 'Enterprise Architecture',
      description: 'Learn scalable patterns used in professional Angular and Node.js applications.',
      icon: 'business_center',
    },
    {
      title: 'Interview Preparation',
      description:
        'Revise important frontend, backend and database concepts for technical interviews.',
      icon: 'psychology',
    },
  ];
}
