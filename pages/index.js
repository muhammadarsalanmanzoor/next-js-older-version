import Head from 'next/head';

// featured events data handler
import { getFeaturedEvents } from '../utils/api-utils';

// components
import EventList from '@/components/events/EventList';

// we can add Head component in any where in our page
function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800, // after half our if we trigger a request then this page should be
  }; // re-generate
}

export default HomePage;
