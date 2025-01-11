import { Login } from './components/Login';

export default function Home() {
  return (
    <main className='grid grid-cols-3'>
      <div></div>
      <div>
        <Login />
      </div>
      <div></div>
    </main>
  );
}
