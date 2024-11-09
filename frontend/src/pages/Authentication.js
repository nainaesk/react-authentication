import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { jsonify } from '../util/formatter';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {

  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw jsonify({ message: 'Unsupported mode' }, { status: 422 });
  }

  const fd = await request.formData();

  const authData = {
    email: fd.get('email'),
    password: fd.get('password')
  }

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw jsonify({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 2);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}