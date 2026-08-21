import GamblingHeader from '../../../../commonComps/GamblingHeader';
import ParlayCardList from '../../../../commonComps/newParlayLayout';
import { todaysParlay1, todaysParlay2, todaysParlay3 } from '../../../../commonComps/todaysParlays';
import { todaysGames } from '../../../../commonComps/todaysGames';
import { secretCode } from '../../../../constants';

export default function ParlayRealPage() {
  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader title={'Ésessssss'} link={'back'} />
      <ParlayCardList
        parlay1={todaysParlay1}
        parlay2={todaysParlay2}
        parlay3={todaysParlay3}
        todaysGamesData={todaysGames}
        basePath={`${secretCode}/Basketball`}
      />
    </main>
  );
}
