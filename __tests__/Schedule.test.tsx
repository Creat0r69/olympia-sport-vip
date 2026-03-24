import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Schedule from '@/components/Schedule';

// Minimal EN messages needed for the Schedule component
const messages = {
  schedule: {
    heading: 'Class Schedule',
    eyebrow: 'Our Schedule',
    subtitle: 'March 23 – April 30',
    hours: 'Mon–Sat: 07:00–22:00 · Sunday: 10:00–17:00',
    time: 'Time',
    days: {
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
      fri: 'Fri', sat: 'Sat', sun: 'Sun',
    },
    classes: {
      absCore: 'Abs & Core',
      stretching: 'Stretching',
      mobility: 'Mobility',
      circuitTraining: 'Circuit Training',
      caf: 'C.A.F',
      sportPrep: 'Sport Prep',
      kidsClub: 'Kids Club',
      ladiesOnly: 'Ladies Only',
      calisthenics: 'Calisthenics',
      orientalDance: 'Oriental Dance',
      pilates: 'Pilates',
      hiit: 'HIIT',
      combat: 'Combat',
      step: 'Step',
      pump: 'Pump',
      attack: 'Attack',
      mensOnly: 'Men Only',
      cross: 'Cross',
    },
  },
};

function renderSchedule() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Schedule />
    </NextIntlClientProvider>
  );
}

describe('Schedule', () => {
  it('renders the section heading', () => {
    renderSchedule();
    expect(screen.getByText('Class Schedule')).toBeInTheDocument();
  });

  it('renders the eyebrow label', () => {
    renderSchedule();
    expect(screen.getByText('Our Schedule')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderSchedule();
    expect(screen.getByText('March 23 – April 30')).toBeInTheDocument();
  });

  it('renders all 7 day headers', () => {
    renderSchedule();
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('renders all 7 time slots', () => {
    renderSchedule();
    ['10:30', '11:30', '15:00', '16:00', '17:30', '18:30', '19:30'].forEach(time => {
      expect(screen.getAllByText(time).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders a class name in a cell', () => {
    renderSchedule();
    // "Abs & Core" appears at 10:30 Monday and 11:30 Friday
    expect(screen.getAllByText('Abs & Core').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the subKey label for Ladies Only + Calisthenics', () => {
    renderSchedule();
    expect(screen.getAllByText('Ladies Only').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Calisthenics').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the opening hours note', () => {
    renderSchedule();
    expect(screen.getByText(/07:00/)).toBeInTheDocument();
  });
});
