export type ScheduleCell =
  | { type: 'class'; key: string; subKey?: string }
  | { type: 'empty' };

export interface TimeSlot {
  time: string;
  days: [
    ScheduleCell, // Monday
    ScheduleCell, // Tuesday
    ScheduleCell, // Wednesday
    ScheduleCell, // Thursday
    ScheduleCell, // Friday
    ScheduleCell, // Saturday
    ScheduleCell, // Sunday
  ];
}

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const schedule: TimeSlot[] = [
  {
    time: '10:30',
    days: [
      { type: 'class', key: 'absCore' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
    ],
  },
  {
    time: '11:30',
    days: [
      { type: 'class', key: 'mobility' },
      { type: 'class', key: 'circuitTraining' },
      { type: 'class', key: 'caf' },
      { type: 'class', key: 'mobility' },
      { type: 'class', key: 'absCore' },
      { type: 'empty' },
      { type: 'empty' },
    ],
  },
  {
    time: '15:00',
    days: [
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
    ],
  },
  {
    time: '16:00',
    days: [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'class', key: 'kidsClub' },
      { type: 'class', key: 'kidsClub' },
      { type: 'empty' },
    ],
  },
  {
    time: '17:30',
    days: [
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'orientalDance' },
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'pilates' },
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'hiit' },
      { type: 'empty' },
    ],
  },
  {
    time: '18:30',
    days: [
      { type: 'class', key: 'combat' },
      { type: 'class', key: 'step' },
      { type: 'class', key: 'pump' },
      { type: 'class', key: 'circuitTraining' },
      { type: 'class', key: 'attack' },
      { type: 'empty' },
      { type: 'empty' },
    ],
  },
  {
    time: '19:30',
    days: [
      { type: 'class', key: 'mensOnly' },
      { type: 'class', key: 'cross' },
      { type: 'class', key: 'mensOnly' },
      { type: 'class', key: 'cross' },
      { type: 'class', key: 'mensOnly' },
      { type: 'empty' },
      { type: 'empty' },
    ],
  },
];
