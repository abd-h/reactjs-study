import classes from './EventsList.module.css';
import { Link  } from 'react-router-dom';

function EventsList({ events }) {
 
  return (
    <div className='my-[2rem] mx-auto max-w-[40rem] '>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}/`}>
              <img
                className="w-1/2 rounded-md mt-4 "
                src={event.image}
                alt={event.title}
              />
              <div className={classes.content}>
                <h2 className='text-3xl ' >{event.title}</h2>
                <time className='mt-5 py-5 text-2xl'  >{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
