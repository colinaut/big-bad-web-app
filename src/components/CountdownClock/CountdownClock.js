import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import React from 'react'
import moment from 'moment'

import * as actions from '../../store/actions';

import styles from './CountdownClock.module.css';

const CountdownClock = props => {

  const {
    countdown,
    fetchMyAvailableGameSlots
  } = props

  const CurrentClock = ()=> {
    if (countdown && countdown.clocks && countdown.clocks.length > 0) {
      let i = 0;
      while (i < countdown.clocks.length) {
        const complete = countdown.clocks[i].quotaIncrease ? fetchMyAvailableGameSlots : null
        if (countdown.clocks[i].time > moment(new Date()).valueOf()) {
          return <Clock date={countdown.clocks[i].time} label={countdown.clocks[i].label} complete={complete}/>
        }
        i++
      }
    } else return null
  }
  
  return countdown ? (
    <CurrentClock/>
  ) : null
}

const Clock = ({label,date,complete}) => {
  return (
    <div className={styles.CountdownClock}>
      <h4 className={styles.CountdownHeader}>{label} <span className={styles.Date}>{moment(date).format('MMM Do YYYY, h:mm a')}!</span></h4>
      <div className={styles.CountdownWrapper}><Countdown date={date} onComplete={complete}></Countdown></div>
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
    countdown: events.countdown,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCountdown: () => dispatch(actions.fetchCountdown()),
    fetchMyAvailableGameSlots: () => dispatch(actions.fetchMyAvailableGameSlots()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CountdownClock)