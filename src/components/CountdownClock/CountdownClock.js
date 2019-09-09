import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import React from 'react'
import unixTime from 'unix-time';
import moment from 'moment'

import * as actions from '../../store/actions';

import styles from './CountdownClock.module.css';

const CountdownClock = props => {

  const {
    countdown = {quotaIncrease:[],regDeskOpen:null},
    fetchMyAvailableGameSlots
  } = props


  if (countdown.quotaIncrease[0] > unixTime(new Date())) {
    return <Clock date={countdown.quotaIncrease[0]} label='Next Quota Increase:' complete={fetchMyAvailableGameSlots}/>
  } else if (countdown.quotaIncrease[1] > unixTime(new Date())) {
    return <Clock date={countdown.quotaIncrease[1]} label='Next Quota Increase:' complete={fetchMyAvailableGameSlots}/>
  } else if (countdown.regDeskOpen > unixTime(new Date())) {
    return <Clock date={countdown.regDeskOpen} label='Big Bad Con Opens:'/>
  } else return null
  
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