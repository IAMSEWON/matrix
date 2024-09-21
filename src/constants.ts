export type CalendarType = 'month' | 'week';
export type IDayItem = { yearMonth: string; date: number; type: 'prev' | 'this' | 'next' };
export const IMPORTANCE = {
  doit: '긴급하고 중요한',
  schedule: '긴급하지않고 중요한',
  delegate: '긴급하고 중요하지 않은',
  eliminate: '긴급하지않고 중요하지않고',
} as const;

export const ALRAM_TIME = {
  '0': '마감 시간',
  '5': '5분 전',
  '10': '10분 전',
  '15': '15분 전',
  '30': '30분 전',
  '60': '1시간 전',
  '120': '2시간 전',
  '1440': '1일 전',
} as const;
