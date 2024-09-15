import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure you want delete?');
    
    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className='flex flex-col w-[40rem] gap-3 my-4 mx-auto items-center border-2'>
      <img className='w-[30rem] rounded-md mt-4 ' src={event.image} alt={event.title} />
      <h1 className='font-bold'>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button className='hover:border-2 ' onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
