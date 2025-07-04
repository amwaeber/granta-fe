import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EventSummaryView from '@/components/EventSummaryView/EventSummaryView';
import {EventSummary} from '@/types/eventSummary.dto';

describe('EventSummaryView', () => {
  const mockEvent: EventSummary = {
    id: '1',
    summary: 'Test Event',
    startTime: '2025-07-04T12:30:00Z',
    endTime: '2025-07-04T14:00:00Z',
    location: 'Test Location',
  };

  test('renders event summary and details correctly', () => {
    const {getByText} = render(
      <EventSummaryView eventData={mockEvent} onPress={() => {}} />
    );

    expect(getByText('Test Event')).toBeTruthy();
    expect(getByText('04 July 2025')).toBeTruthy();
    expect(getByText('Start: 13:30')).toBeTruthy();
    expect(getByText('End: 15:00')).toBeTruthy();
    expect(getByText('Test Location')).toBeTruthy();
  });

  test('does not render "End" time if not present', () => {
    const mockNoEndTime = { ...mockEvent, endTime: undefined };
    const {queryByText} = render(
      <EventSummaryView eventData={mockNoEndTime} onPress={() => {}} />
    );

    expect(queryByText('End:')).toBeNull();
  });

  test('triggers onPress when tapped', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <EventSummaryView eventData={mockEvent} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Test Event'));
    expect(onPressMock).toHaveBeenCalled();
  });
});