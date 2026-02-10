export type SessionType = 'opening' | 'session' | 'break' | 'closing';

export interface TimetableEntry {
  id: string;
  startTime: string;
  duration: number;
  type: SessionType;
  title: string;
  description?: string;
  partId?: number;
  speakerIds?: string[];
}

export const timetable: TimetableEntry[] = [
  {
    id: 't-prejourney',
    startTime: '12:40',
    duration: 80,
    type: 'opening',
    title: 'Pre-Journey Speech (w. Josh)',
  },
  {
    id: 't-opening',
    startTime: '14:00',
    duration: 10,
    type: 'opening',
    title: '오프닝',
    description: '우리는 어쩌다 이렇게 모였을까',
  },
  {
    id: 't-dlift',
    startTime: '14:15',
    duration: 65,
    type: 'session',
    title: 'Dlift Activity',
    description: '만일 외딴 섬에 함께 떨어진다면',
  },
  {
    id: 't-break0',
    startTime: '15:20',
    duration: 10,
    type: 'break',
    title: 'Break Time',
  },
  {
    id: 't-part1',
    startTime: '15:30',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 1. Deep Thinkers',
    partId: 1,
    speakerIds: ['blake', 'jiji', 'hanji', 'everett'],
  },
  {
    id: 't-part2',
    startTime: '15:50',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 2. Achievers',
    partId: 2,
    speakerIds: ['jonathan', 'julie', 'sarah', 'aaron'],
  },
  {
    id: 't-part3',
    startTime: '16:10',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 3. Connectors',
    partId: 3,
    speakerIds: ['yoshi', 'sunny', 'betty', 'hannah'],
  },
  {
    id: 't-break1',
    startTime: '16:30',
    duration: 10,
    type: 'break',
    title: 'Break Time',
  },
  {
    id: 't-part4',
    startTime: '16:40',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 4. Creators',
    partId: 4,
    speakerIds: ['ian', 'frodo', 'javien', 'sky'],
  },
  {
    id: 't-part5',
    startTime: '17:00',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 5. Problem Solvers',
    partId: 5,
    speakerIds: ['charlie', 'hugh', 'nora', 'windy'],
  },
  {
    id: 't-part6',
    startTime: '17:20',
    duration: 20,
    type: 'session',
    title: 'Human Library Part 6. Drivers',
    partId: 6,
    speakerIds: ['billie', 'oren', 'ray', 'jensen'],
  },
  {
    id: 't-closing',
    startTime: '17:40',
    duration: 20,
    type: 'closing',
    title: '디브리핑',
    description: '우리에게 필요한 일의 감각이 있다면',
  },
];

export const getEntryEndTime = (entry: TimetableEntry): string => {
  const [hours, minutes] = entry.startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + entry.duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMins = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
};
