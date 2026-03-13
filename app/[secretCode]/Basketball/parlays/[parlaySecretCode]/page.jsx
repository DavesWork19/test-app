import GamblingHeader from '../../../../commonComps/GamblingHeader';
import ParlayCardList from '../../../../commonComps/newParlayLayout';

export default function ParlayRealPage() {
  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader title={'Welcome Ése'} />
      <ParlayCardList />
    </main>
  );
}
