import { useNavigate, Form, json, redirect, useNavigation, useActionData, useRouteError } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  // console.log(data.errors);
  return (
    <Form method={method} className={classes.form + " border-2 bg-slate-400"}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <p>
        <label htmlFor="title">Title</label>
        <input
          className="border-2"
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          className="border-2"
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          className="border-2"
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting} className="text-xl">
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const method = request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    date: data.get('date'),
    image: data.get('image'),
    description: data.get('description'),
  }

  console.log(method);
  console.log(eventId);
  let url = 'http://localhost:8080/events/';

  if (method === 'PATCH') {
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save the event!' }, { status: 500 });
  } else {
    return redirect("/events");
  }
};
