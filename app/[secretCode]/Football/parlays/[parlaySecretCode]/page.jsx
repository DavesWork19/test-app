import GamblingHeader from '../../../../commonComps/GamblingHeader';
import ParlayCardList from '../../../../commonComps/newParlayLayout';
import { todaysParlayFootball1, todaysParlayFootball2, todaysParlayFootball3 } from '../../../../commonComps/todaysParlaysFootball';
import { todaysGamesFootball } from '../../../../commonComps/todaysGamesFootball';
import { secretCode } from '../../../../constants';

export default function ParlayRealPage() {
  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader title={'Ésessssss'} link={'back'} />
      <ParlayCardList
        parlay1={todaysParlayFootball1}
        parlay2={todaysParlayFootball2}
        parlay3={todaysParlayFootball3}
        todaysGamesData={todaysGamesFootball}
        basePath={`${secretCode}/Football`}
      />
    </main>
  );
}
