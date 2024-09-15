import React from 'react';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return (
    <>
      <section className="border-2">
        <h1 className="text-center">NewEventPage</h1>
        <EventForm method='post' />
      </section>
    </>
  );
}

export default NewEventPage;
