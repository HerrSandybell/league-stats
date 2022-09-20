import styles from './SummonerInput.module.css';
import { useState } from 'react';

function SummonerInput (props) {
    const [summonerName, setSummonerName] = useState('');

    const changeHandler = (event) => {
        setSummonerName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSummonerNameSubmitted(summonerName);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={styles['summoner-input__control']}>
                <input value={summonerName} onChange={changeHandler} type='text' placeholder='Input Summoner Name Here...' />
                {/* <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> */}
                <button type='submit' className={styles['summoner-input__button']}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg></button>
            </div>
        </form>
        // <div>hello</div>
    );
}

export default SummonerInput;
