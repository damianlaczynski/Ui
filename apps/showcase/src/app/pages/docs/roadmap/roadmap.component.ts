import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableOfContentComponent } from 'ui';

type RoadmapStatus = 'shipped' | 'in-progress' | 'planned';

interface RoadmapMilestone {
  id: string;
  title: string;
  target: string;
  status: RoadmapStatus;
  highlights: string[];
}

@Component({
  selector: 'app-roadmap',
  imports: [RouterLink, TableOfContentComponent],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent {
  readonly milestones: RoadmapMilestone[] = [
    {
      id: 'q1-2026',
      title: 'Core stabilization',
      target: 'Q1 2026',
      status: 'shipped',
      highlights: [
        'Unified token system for light and dark mode.',
        'Baseline accessibility pass for core form and navigation components.',
        'Initial docs foundation with showcase and getting-started flows.',
      ],
    },
    {
      id: 'q2-2026',
      title: 'Developer experience',
      target: 'Q2 2026',
      status: 'in-progress',
      highlights: [
        'More complete API docs with usage patterns and anti-patterns.',
        'Theming guide with real enterprise examples.',
        'Improved test coverage for interactive components.',
      ],
    },
    {
      id: 'q3-2026',
      title: 'Advanced components',
      target: 'Q3 2026',
      status: 'planned',
      highlights: [
        'Data-heavy patterns: richer tables, filtering and state containers.',
        'Animation and motion presets aligned with Fluent guidance.',
        'Stronger layout primitives for dashboards and enterprise forms.',
      ],
    },
    {
      id: 'q4-2026',
      title: 'Release quality and ecosystem',
      target: 'Q4 2026',
      status: 'planned',
      highlights: [
        'Versioned migration guides and changelog quality improvements.',
        'Starter templates and schematic support for onboarding speed.',
        'Performance benchmarks and bundle-size tracking in CI.',
      ],
    },
  ];

  readonly deliveryPrinciples: string[] = [
    'Accessibility, performance and API consistency are release gates.',
    'Breaking changes are grouped and documented with migration paths.',
    'Roadmap can shift based on user feedback and production priorities.',
  ];

  getStatusLabel(status: RoadmapStatus): string {
    const statusMap: Record<RoadmapStatus, string> = {
      shipped: 'Shipped',
      'in-progress': 'In Progress',
      planned: 'Planned',
    };
    return statusMap[status];
  }
}
