import { Login } from '../components/Login/Login';

export default function LoginPage() {
  return (
    <main>
      <main className='grid grid-cols-3'>
        <div></div>
        <div>
          <Login />
        </div>
        <div></div>
      </main>
    </main>
  );
}
