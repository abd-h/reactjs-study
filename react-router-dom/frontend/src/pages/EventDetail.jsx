import React from 'react';
import { json, useRouteLoaderData, redirect} from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
  const data = useRouteLoaderData('event-detail');

  console.log(data);
  return (
    <>
      <h1 className="text-green-700 font-bold text-3xl  text-center">
        EventDetailPage
      </h1>

      <EventItem event={data} />
      
    </>
  );
}

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw json({ message: "EventDetailPage: Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};


export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });
  
  if (!response.ok) {
    throw json({message: 'event not deleted'}, {status: 500})
  } else {
    return redirect('/events')
  }
}