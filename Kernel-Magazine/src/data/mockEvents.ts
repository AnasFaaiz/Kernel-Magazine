export interface Event {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
}

export const mockEvents: Event[] = [
	{
		id: 'e1',
		title: 'Hackathon 2k25 Kick-off',
		description: 'Join us for the Opening ceremony',
		imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=Hackathon'
	},
	{
    id: 'e2',
    title: 'Workshop: Intro to Docker',
    description: 'A hands-on workshop covering the fundamentals of Docker and containerization for modern development.',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=Docker'
  },
  {
    id: 'e3',
    title: 'Tech Talk: The Future of AI',
    description: 'Listen to industry experts discuss the future trends and ethical considerations in Artificial Intelligence.',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=AI+Talk'
  },
  {
    id: 'e4',
    title: 'Project Expo & Awards',
    description: 'See the amazing projects built by students and celebrate the winners at the closing ceremony.',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=Expo'
  },
]
