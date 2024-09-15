import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../utility/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();

  // responsible for creating automatic logout after 1hr.
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration / 1000 / 60);

    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration);
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
