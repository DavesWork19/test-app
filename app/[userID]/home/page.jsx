import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <div className='grid grid-cols-1 gap-4'>
        <button className='p-8 border border-black'>
          {'Send Generic Docs'}
        </button>
        <button className='p-8 border border-black'>
          {'Send Custom Docs'}
        </button>
      </div>
      <div className='p-8'></div>
      <div className='p-8'></div>
      <Footer />
    </main>
  );
}
