import Head from 'next/head';
import EventContent from '@/components/event-detail/EventContent';
import EventLogistics from '@/components/event-detail/EventLogistics';
import EventSummary from '@/components/event-detail/EventSummary';

import { getEventById, getFeaturedEvents } from '../../utils/api-utils';

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // fallback: false,
    fallback: true,
  };
}

export default EventDetailPage;
