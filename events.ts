export interface Event {
  id: number;
  name: string;
  description?: string;
  img: string;
  startDate: string;
  endDate: string;
  color?: string;
  url?: string;
  showOnHome?: boolean;
}

// Helper function to generate a random color in hexadecimal format
const getRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const events: Event[] = [
  {
    id: 1,
    name: 'Ascendant Aces',
    description: 'Placeholder description for Ascendant Aces event',
    img: '/assets/events/placeholder.png', // Placeholder image name or URL
    startDate: '2024-06-06',
    endDate: '2024-06-26',
    color: getRandomColor(), // Random color generated here
    url: 'https://game8.co/games/Wuthering-Waves/archives/456482',
    showOnHome: true,
  },
  {
    id: 2,
    name: 'Alloy Smelt',
    description: 'Placeholder description for Alloy Smelt event',
    img: '/assets/events/placeholder.png', // Placeholder image name or URL
    startDate: '2024-06-06',
    endDate: '2024-06-27',
    color: getRandomColor(), // Random color generated here
    url: 'https://game8.co/games/Wuthering-Waves/archives/455403',
    showOnHome: true,
  },
  {
    id: 3,
    name: 'Wuthering Exploration',
    description: 'Placeholder description for Wuthering Exploration event',
    img: '/assets/events/placeholder.png', // Placeholder image name or URL
    startDate: '2024-06-13',
    endDate: '2024-06-27',
    color: getRandomColor(), // Random color generated here
    url: 'https://game8.co/games/Wuthering-Waves/archives/457210',
    showOnHome: true,
  },
  {
    id: 4,
    name: 'Second Coming of Solaris',
    description: 'Placeholder description for Second Coming of Solaris event',
    img: '/assets/events/placeholder.png', // Placeholder image name or URL
    startDate: '2024-06-13',
    endDate: '2024-06-27',
    color: getRandomColor(), // Random color generated here
    url: 'https://game8.co/games/Wuthering-Waves/archives/457618',
    showOnHome: true,
  },
  {
    id: 5,
    name: '"Chord Cleansing" LT Echo Double Drop',
    description:
      'Placeholder description for "Chord Cleansing" LT Echo Double Drop event',
    img: '/assets/events/placeholder.png', // Placeholder image name or URL
    startDate: '2024-06-20',
    endDate: '2024-06-27',
    color: getRandomColor(), // Random color generated here
    url: 'https://game8.co/games/Wuthering-Waves/archives/457211',
    showOnHome: true,
  },
];

export default events;
