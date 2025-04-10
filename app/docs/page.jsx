import { DocInput } from './DocInput';

export default function Docs() {
  return (
    <main>
      <div className='grid grid-cols-1 gap-4'>
        <button className='p-8 border border-black'>
          {'Send Generic Docs????'}
        </button>
        <DocInput />
      </div>
      <div className='p-8'></div>
      <div className='p-8'></div>
    </main>
  );
}
