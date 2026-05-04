export interface Project {
  slug: string;
  num: string;
  name: string;
  href: string;
}

export const projects: Project[] = [
  { slug: 'linkedin-video',     num: '01', name: 'LinkedIn Video',     href: '/project/linkedin-video'     },
  { slug: 'linkedin-reactions', num: '02', name: 'LinkedIn Reactions', href: '/project/linkedin-reactions' },
  { slug: 'nearby-friends',     num: '03', name: 'Nearby Friends',     href: '/project/nearby-friends'     },
];

const indexOf = (slug: string) => projects.findIndex((p) => p.slug === slug);

export function getNextProject(slug: string): Project {
  const i = indexOf(slug);
  return projects[(i + 1) % projects.length];
}

export function getPrevProject(slug: string): Project {
  const i = indexOf(slug);
  return projects[(i - 1 + projects.length) % projects.length];
}
