import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '@/components/events/EventList';
import ResultTitle from '@/components/events/ResultTitle';

function FilteredEventsPage() {
  const router = useRouter();
  const queryData = router.query.slug;

  if (!queryData) {
    return <p>Loading...</p>;
  }

  const year = +queryData[0];
  const month = +queryData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return <p>Invalid Filter, please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length < 1) {
    return <p>No events found for the chosen year and month!</p>;
  }

  const date = new Date(year, month - 1);

  return (
    <div>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
