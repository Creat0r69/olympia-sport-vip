export interface PricingDuration {
  months: 3 | 6 | 12;
  original: number;
  discounted: number;
}

export interface PricingPlan {
  key: string;
  icon: string;
  highlight: boolean;
  durations: PricingDuration[];
}

export const plans: PricingPlan[] = [
  {
    key: 'plateau',
    icon: '🏋️',
    highlight: false,
    durations: [
      { months: 3,  original: 210, discounted: 168 },
      { months: 6,  original: 390, discounted: 312 },
      { months: 12, original: 720, discounted: 576 },
    ],
  },
  {
    key: 'vip',
    icon: '👑',
    highlight: true,
    durations: [
      { months: 3,  original: 290, discounted: 232 },
      { months: 6,  original: 540, discounted: 432 },
      { months: 12, original: 960, discounted: 768 },
    ],
  },
];
