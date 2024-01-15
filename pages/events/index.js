import { useRouter } from 'next/router';
import { getAllEvents } from '@/dummy-data';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const searchEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch searchEventsHandler={searchEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;
