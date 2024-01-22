import { getFilteredEvents } from '../../utils/api-utils';
import EventList from '@/components/events/EventList';
import ResultTitle from '@/components/events/ResultTitle';

function FilteredEventsPage(props) {
  if (props.hasInvalidFilter) {
    return <p>Invalid Filter, please adjust your values!</p>;
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length < 1) {
    return <p>No events found for the chosen year and month!</p>;
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <div>
      <Head>
        <title>All Events for {props.date.year / props.date.month}</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const queryData = params.slug;

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
    return {
      props: { hasInvalidFilter: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents,
      date: { year, month },
    },
  };
}

export default FilteredEventsPage;
