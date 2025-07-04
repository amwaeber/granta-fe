import { buildListWithHeaders } from '@/utils/buildListWithHeaders';

describe('buildListWithHeaders', () => {
  test('returns headers and events grouped by date', () => {
    const input = [
      {
            id: '1',
            summary: 'Test Event 1',
            startTime: '2025-07-04T12:30:00Z',
            endTime: '2025-07-04T14:00:00Z',
            location: 'Test Location 1'
        },
        {
            id: '2',
            summary: 'Test Event 2',
            startTime: '2025-07-04T14:30:00Z',
            endTime: '2025-07-04T16:00:00Z',
            location: 'Test Location 2'
        },
        {
            id: '31',
            summary: 'Test Event 3',
            startTime: '2025-07-05T08:00:00Z',
            endTime: '2025-07-05T11:00:00Z',
            location: 'Test Location 3'
        },
    ];

    const result = buildListWithHeaders(input);

    expect(result).toEqual([
      { type: 'header', date: 'Friday 04 July 2025' },
      { type: 'event', event: input[0] },
      { type: 'event', event: input[1] },
      { type: 'header', date: 'Saturday 05 July 2025' },
      { type: 'event', event: input[2] },
    ]);
  });

  test('returns empty list for no input', () => {
    const result = buildListWithHeaders([]);
    expect(result).toEqual([]);
  });
});
