import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const data = useRouteLoaderData('event-detail');
  const event = data.event
  console.log(data);
  return (
    <>
      <h1 className="text-center text-red-500">EditEventPage</h1>
      <EventForm event={ data } method='patch' />
    </>
  );
}

export default EditEventPage;