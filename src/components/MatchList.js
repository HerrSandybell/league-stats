import styles from './MatchList.module.css';
import MatchStats from './MatchStats';

function MatchList (props) {
    return (
        <div className={styles['match-list']}>
            {props.matchList.map(match => <MatchStats key={match.gameEndTimestamp} match={match} />)}
        </div>
    );
}

export default MatchList;
