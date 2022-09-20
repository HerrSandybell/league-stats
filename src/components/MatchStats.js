import styles from './MatchStats.module.css';

function MatchStats (props) {
    const displayDuration = (duration) => {
        let minutes = parseInt(duration / (60));
        let seconds = duration % (60);

        return `${minutes}:${seconds}`;
    };

    const displayGameEndTime = (gameEnd) => {
        const today = new Date().getTime();

        const timeDiff = today - gameEnd;

        const timeDiffDays = timeDiff / (1000 * 60 * 60 * 24);

        if (timeDiffDays < 2 && timeDiff >= 1) {
            return `Yesterday`;

        } else if (timeDiffDays > 2) {
            return `${Math.floor(timeDiffDays)} days ago`;
        } else {
            return `${Math.floor(timeDiffDays) * 24} hours ago`;
        }
    };

    return (
        <div className={styles['match-stats']}>
            <div>
                <div>
                    {props.match.gameMode}
                </div>
                <div>
                    {`${displayGameEndTime(props.match.gameEndTimestamp)}`}
                </div>
                <hr />
                <div>
                    {props.match.result ? "Victory" : "Defeat"}
                </div>
                <div>
                    {displayDuration(props.match.duration)}
                </div>
            </div>
            <div>
                <div>
                    {props.match.gameMode}
                </div>
                <div>
                    {props.match.summonerspells.map(spell => <div>{spell}</div>)}
                </div>
                <div>
                    {props.match.champion.name}
                </div>
            </div>
            <div>
                <div>
                    <span>{props.match.kills}</span>/
                    <span>{props.match.deaths}</span>/
                    <span>{props.match.assists}</span>
                </div>
                <div>
                    {props.match.kda + ' KDA'}
                </div>
            </div>
            <div>
                <div>
                    {`Level ${props.match.champion.level}`}
                </div>
                <div>
                    {`${props.match.creepscore} (${props.match.csperminute}) CS`}
                </div>
            </div>
            <div className={styles['items']}>{props.match.items.map(item => <div className={styles['item']}>{item}</div>)}</div>
        </div>

    );
}

export default MatchStats;
