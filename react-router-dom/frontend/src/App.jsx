import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import EventDetailPage, {
  loader as eventDetailLoader, action as eventDeleteAction
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EditEventPage from "./pages/EditEvent";
import RouteLayoutPage from "./pages/RouteLayout";
import EventsLayout from "./pages/EventsLayout";
import ErrorPage from "./Error";
import { action as manipulateAction } from "./components/EventForm";
import NewsletterSignup from "./components/NewsletterSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events/",
        element: <EventsLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          {
            path: ":eventId/",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage />, action: eventDeleteAction },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateAction,
              },
            ],
          },

          { path: "new", element: <NewEventPage />, action: manipulateAction },
        ],
      },
      {path:'newsletter', element: <NewsletterSignup />}
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
