import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export const action = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await  request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  if (mode !== 'login' && mode !== 'signup') {
    throw json({message: 'Mode is not supported!'}, { status: 422})
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
    }

  if (!response.ok) {
    throw json({ message: "Cannot Authenticate user!" }, { status: 500 });
  };

  const resData = await response.json();
  const token = resData.token;

 // storing token on localStorage 
  localStorage.setItem('token', token);

  // creating expiration and storing it on local storage.
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  
  return redirect('/')
}




// export const action = async ({ request }) => {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get("mode") || 'login';
//   const data = await request.formData();

//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   if (mode !== "login" && mode !== "signup") {
//     throw json({ message: "Sorry, mode is not Supported" }, { status: 422 });
//   }

//   const response = await fetch("http://localhost:8080/" + mode, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(authData),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not authenticate user" }, { status: 500 });
//   }

//   // soon: manage that token

//   return redirect("/");
// };

// practice 1
// export const action = async ({ request, params }) => {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get('mode') || 'login';
//   const data = await request.formData();

//   const authData = {
//     email: data.get('email'),
//     password: data.get('password')
//   }

//   if (mode !== 'login' && mode !== 'signup') {
//     throw json({message: 'Sorry this mode is not supported'}, { status: 422})
//   }

//   const response = await fetch('http://localhost:8080/' + mode, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(authData),
//   });

//   if (response.status === 401 || response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({message: 'Could not authenticate user'}, {status: 500})
//   }

//   return redirect('/')
// }
 
// practice 2
// export const action = async ({ request, params }) => {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get('mode') || 'login';

//   const data = await request.formData();
//   const authData = {
//     email: data.get('email'),
//     password: data.get('password')
//   }

//   if (mode !== "login" && mode !== "signup") {
//     throw json({ message: "Sorry mode is not supported!"}, { status: 422 });
//   }

//   const response = await fetch("http://localhost:8080/" + mode, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(authData),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({message: 'Could not authenticate user'}, { status: 500})
//   }

//   return redirect('/')
// }
