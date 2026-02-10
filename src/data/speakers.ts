export interface Speaker {
  id: string;
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  image: string;
  part: number;
}

export type PartInfo = {
  id: number;
  titleEn: string;
  titleKo: string;
  description: string;
  style: 'deep-thinkers' | 'achievers' | 'connectors' | 'creators' | 'problem-solvers' | 'drivers';
};

export const parts: PartInfo[] = [
  {
    id: 1,
    titleEn: 'Deep Thinkers',
    titleKo: '깊이 있는 사고가',
    description: '분석하고, 탐구하고, 이해하는 힘',
    style: 'deep-thinkers',
  },
  {
    id: 2,
    titleEn: 'Achievers',
    titleKo: '성취하는 사람들',
    description: '목표를 향해 끊임없이 나아가는 추진력',
    style: 'achievers',
  },
  {
    id: 3,
    titleEn: 'Connectors',
    titleKo: '연결하는 사람들',
    description: '사람과 사람을 이어주는 따뜻한 관계의 힘',
    style: 'connectors',
  },
  {
    id: 4,
    titleEn: 'Creators',
    titleKo: '창조하는 사람들',
    description: '새로운 아이디어와 가능성을 발견하는 상상력',
    style: 'creators',
  },
  {
    id: 5,
    titleEn: 'Problem Solvers',
    titleKo: '문제 해결사',
    description: '복잡한 문제를 해결하는 논리적 사고력',
    style: 'problem-solvers',
  },
  {
    id: 6,
    titleEn: 'Drivers',
    titleKo: '이끄는 사람들',
    description: '팀을 움직이고 결과를 만들어내는 리더십',
    style: 'drivers',
  },
];

export const speakers: Speaker[] = [
  // Part 1: Deep Thinkers
  { id: 'blake', name: 'Blake', image: '/speakers/blake.png', part: 1 },
  { id: 'jiji', name: 'Jiji', image: '/speakers/jiji.png', part: 1 },
  { id: 'hanji', name: 'Hanji', image: '/speakers/hanji.png', part: 1 },
  { id: 'everett', name: 'Everett', image: '/speakers/everett.png', part: 1 },

  // Part 2: Achievers
  { id: 'jonathan', name: 'Jonathan', image: '/speakers/jonathan.png', part: 2 },
  { id: 'julie', name: 'Julie', image: '/speakers/julie.png', part: 2 },
  { id: 'sarah', name: 'Sarah', image: '/speakers/sarah.png', part: 2 },
  { id: 'aaron', name: 'Aaron', image: '/speakers/aaron.png', part: 2 },

  // Part 3: Connectors
  { id: 'yoshi', name: 'Yoshi', image: '/speakers/yoshi.png', part: 3 },
  { id: 'sunny', name: 'Sunny', image: '/speakers/sunny.png', part: 3 },
  { id: 'betty', name: 'Betty', image: '/speakers/betty.png', part: 3 },
  { id: 'hannah', name: 'Hannah', image: '/speakers/hannah.png', part: 3 },

  // Part 4: Creators
  { id: 'ian', name: 'Ian', image: '/speakers/ian.png', part: 4 },
  { id: 'frodo', name: 'Frodo', image: '/speakers/frodo.png', part: 4 },
  { id: 'javien', name: 'Javien', image: '/speakers/javien.png', part: 4 },
  { id: 'sky', name: 'Sky', image: '/speakers/sky.png', part: 4 },

  // Part 5: Problem Solvers
  { id: 'charlie', name: 'Charlie', image: '/speakers/charlie.png', part: 5 },
  { id: 'hugh', name: 'Hugh', image: '/speakers/hugh.png', part: 5 },
  { id: 'nora', name: 'Nora', image: '/speakers/nora.png', part: 5 },
  { id: 'windy', name: 'Windy', image: '/speakers/windy.png', part: 5 },

  // Part 6: Drivers
  { id: 'billie', name: 'Billie', image: '/speakers/billie.png', part: 6 },
  { id: 'oren', name: 'Oren', image: '/speakers/oren.png', part: 6 },
  { id: 'ray', name: 'Ray', image: '/speakers/ray.png', part: 6 },
  { id: 'jensen', name: 'Jensen', image: '/speakers/jensen.png', part: 6 },
];

export const speakerMap = new Map(speakers.map(s => [s.id, s]));

export const getSpeakersByPart = (partId: number): Speaker[] => {
  return speakers.filter(s => s.part === partId);
};
