import { Outlet } from "react-router-dom";
import React from "react";
import EventsNavigation from "../components/EventsNavigation";

const EventsLayout = () => {
  return (
    <>
      <EventsNavigation />
      <main><Outlet /></main>
    </>
  );
};

export default EventsLayout;
