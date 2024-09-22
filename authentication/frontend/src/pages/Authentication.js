
import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }
console.log(authData);
  if (mode !== 'login' && mode !== 'signup') {
    throw json({message: 'Unsupported mode'}, {status: 422})
  }

  const response = await fetch('http://localhost:8080/' + mode, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'User not authenticated'}, {status: 500})
  }

  return redirect('/')
}

// export const action = async ({ request, params }) => {
//   const searchParams = new URL(request.url).searchParams;
  
//   const mode = searchParams.get('mode') || 'login';
//   const data = await request.formData();
//   const method = request.method;
//   console.log(mode);
//   const authData = {
//     email: data.get('email'),
//     password: data.get('password')
//   }

//   if (mode !== 'login' && mode !== 'signup') {
//     throw json({message: 'Unsupported mode'}, {status: 422})
//   }

//   const response = await fetch('http://localhost:8080/' + mode, {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(authData),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({message: 'User not Authenticated!'}, {status: 500})
//   } 

//   return redirect('/');
// }