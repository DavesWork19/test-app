import { SignOut } from './SignOut';

export default function Settings() {
  return (
    <main>
      <div className='grid grid-cols-1 gap-4'>
        <SignOut />
      </div>
      <div className='p-8'></div>
      <div className='p-8'></div>
    </main>
  );
}
