import styles from './MainCard.module.css';
import SummonerInput from './SummonerInput';
import MatchList from './MatchList';
import { useState } from 'react';

function MainCard () {
    const [matchList, setMatchList] = useState([]);

    const summonerNameSubmitHandler = async (summonerName) => {
        console.log(summonerName);

        let res = await fetch(`https://ih2ncp5s3e.execute-api.us-east-2.amazonaws.com/dev/matches/${summonerName}`);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setMatchList(data);
        }
    };

    return (
        <div className={styles['main-card']}>
            <h2>Match Stats</h2>
            <SummonerInput onSummonerNameSubmitted={summonerNameSubmitHandler} />
            {matchList.length ? <MatchList matchList={matchList} /> : ''}
        </div>
    );
}

export default MainCard;