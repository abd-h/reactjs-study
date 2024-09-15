import React, { Suspense } from 'react'
import { json, defer, useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

const EventsPage = () => {
  const { events } = useLoaderData('event-detail');
  // console.log(events);
  return (
    <>
      <h1 className="text-orange-400 text-2xl text-center">EventsPage</h1>
      <Suspense fallback={<p className='text-center text-red-500'>Loading...</p>}>
        <Await resolve={ events }>
        { (loadedEvent => <EventsList events={loadedEvent} />)}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;


const eventLoader = async () => {
  const response = await fetch("http://localhost:8080/events/");

  if (!response.ok) {
    throw json({ message: 'Could not fetch events data' }, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.events
      ;
  }
};

export const loader = async ({ request, params }) => {
  return defer({
    events: eventLoader(),
  })
}