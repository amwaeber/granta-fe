import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventDetailsModal from '@/components/EventDetailsModal/EventDetailsModal';
import { Event } from '@/types/event.dto';

describe('EventDetailsModal', () => {
  const mockEvent: Event = {
    id: '1',
    summary: 'Test Event 1',
    startTime: '2025-07-04T12:30:00Z',
    endTime: '2025-07-04T14:00:00Z',
    location: 'Test Location 1',
    description: 'A pretty big event.'
  };

  test('renders modal with event details when visible', () => {
    const { getByText } = render(
      <EventDetailsModal event={mockEvent} visible={true} onClose={() => {}} />
    );

    expect(getByText('Test Event 1')).toBeTruthy();
    expect(getByText('04 July 2025')).toBeTruthy();
    expect(getByText('Start: 13:30')).toBeTruthy();
    expect(getByText('End: 15:00')).toBeTruthy();
    expect(getByText('Test Location 1')).toBeTruthy();
    expect(getByText('A pretty big event.')).toBeTruthy();
  });

  test('does not render End time if endTime is missing', () => {
    const eventWithoutEnd: Event = { ...mockEvent, endTime: undefined };
    const { queryByText } = render(
      <EventDetailsModal event={eventWithoutEnd} visible={true} onClose={() => {}} />
    );

    expect(queryByText('End:')).toBeNull();
  });

  test('renders loading state when event is undefined', () => {
    const { getAllByTestId } = render(
      <EventDetailsModal event={undefined as any} visible={true} onClose={() => {}} />
    );

    // Should show 2 activity indicators: one in header and one in body
    expect(getAllByTestId('activity-indicator')).toHaveLength(2);
  });

  test('calls onClose when close button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <EventDetailsModal event={mockEvent} visible={true} onClose={onCloseMock} />
    );

    const closeButton = getByRole('button'); // because Pressable becomes a button in test env
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render modal content when visible is false', () => {
    const { queryByText } = render(
      <EventDetailsModal event={mockEvent} visible={false} onClose={() => {}} />
    );

    expect(queryByText('Test Event 1')).toBeNull();
  });
});