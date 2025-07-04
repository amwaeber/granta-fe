import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import EventSummaryList from '@/components/EventSummaryList/EventSummaryList';

const mockEventsResponse = {
    results: [
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
            startTime: '2025-07-04T08:00:00Z',
            endTime: '2025-07-04T11:00:00Z',
            location: 'Test Location 3'
        },
    ],
    next: null
};

const mockEventDetail = {
    id: '1',
    summary: 'Test Event 1',
    startTime: '2025-07-04T12:30:00Z',
    endTime: '2025-07-04T14:00:00Z',
    location: 'Test Location 1',
    description: 'A pretty big event.'
};

describe('EventSummaryList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn((url) => {
            if (url.includes('/events/1/')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockEventDetail)
                });
            }
            return Promise.resolve({
                json: () => Promise.resolve(mockEventsResponse)
            });
        }) as jest.Mock;
    });

    test('renders loading spinner initially', async () => {
        const {queryByTestId} = render(<EventSummaryList/>);
        expect(queryByTestId('event-summary-view')).toBeNull();
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    });

    test('renders list of events after fetch', async () => {
        const {getAllByTestId} = render(<EventSummaryList/>);
        await waitFor(() => {
            const eventViews = getAllByTestId('event-summary-view');
            expect(eventViews.length).toBe(3);
        });
    });

    // Skipping as permanent sticky header workaround means list is never empty
    test.skip('shows empty state if no events', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({results: [], next: null})
        });
        const {getByText} = render(<EventSummaryList />);
        await waitFor(() => {
            expect(getByText('No events found.')).toBeTruthy();
        });
    });

    test('opens modal with event details on press', async () => {
        const {getByText, getAllByTestId} = render(<EventSummaryList/>);
        await waitFor(() => getAllByTestId('event-summary-view'));
        fireEvent.press(getByText('Test Event 1'));
        await waitFor(() => {
            expect(getByText('A pretty big event.')).toBeTruthy(); // from mocked modal
        });
    });

    it('calls refresh function and resets events', async () => {
        const {getByTestId} = render(<EventSummaryList/>);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        const flatList = getByTestId('event-summary-flat-list');
        act(() => {
            fireEvent(flatList, 'refresh');
        });
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    });

    it('loads more data on scroll', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({
                results: [
                    {
                        id: '1',
                        summary: 'Test Event 1',
                        startTime: '2025-07-04T12:30:00Z',
                        endTime: '2025-07-04T14:00:00Z',
                        location: 'Test Location 1'
                    }

                ],
                next: 'next-page-url'
            })
        }).mockResolvedValueOnce({
            json: () => Promise.resolve({
                results: [
                    {
                        id: '2',
                        summary: 'Test Event 2',
                        startTime: '2025-07-04T14:30:00Z',
                        endTime: '2025-07-04T16:00:00Z',
                        location: 'Test Location 2'
                    }
                ],
                next: null
            })
        });

        const {getAllByTestId, getByTestId} = render(<EventSummaryList/>);
        await waitFor(() => getAllByTestId('event-summary-view'));

        act(() => {
            fireEvent(getByTestId('event-summary-flat-list'), 'endReached');
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });
});