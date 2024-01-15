// featured events data handler
import { getFeaturedEvents } from '../dummy-data';

// components
import EventList from '@/components/events/EventList';

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
