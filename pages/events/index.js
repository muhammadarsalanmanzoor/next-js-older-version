import Head from 'next/head';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../utils/api-utils';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  const searchEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <EventsSearch searchEventsHandler={searchEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60, // every time after a minute request comes re-generate this page
  };
}

export default AllEventsPage;
