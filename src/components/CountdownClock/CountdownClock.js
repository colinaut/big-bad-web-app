import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import React from 'react'
import unixTime from 'unix-time';

import * as actions from '../../store/actions';

import styles from './CountdownClock.module.css';

const CountdownClock = props => {

  const {authStatus,
    countdown = {quotaIncrease:[],regDeskOpen:null},
    fetchMyAvailableGameSlots} = props

  const countdownTimer = () => {
    if (countdown.quotaIncrease[0] > unixTime(new Date())) {
      return {time: countdown.quotaIncrease[0], label: 'Next Quota Increase!', complete: () => fetchMyAvailableGameSlots()}
    } else if (countdown.quotaIncrease[0] < unixTime(new Date()) && countdown.quotaIncrease[1] > unixTime(new Date())) {
      return {time: countdown.quotaIncrease[1], label: 'Next Quota Increase!', complete: () => fetchMyAvailableGameSlots()}
    } else if (countdown.regDeskOpen > unixTime(new Date())) {
      return {time: countdown.regDeskOpen, label: 'Big Bad Con Opens!', complete: () => {}}
    } else return null
  }


  return (authStatus && countdownTimer()) ? (
    <div className={styles.CountdownClock}>
      <h4 className={styles.CountdownHeader}>{countdownTimer().label}</h4>
      <Countdown date={countdownTimer().time} onComplete={countdownTimer().complete}></Countdown>
    </div>
  ) : null
}

const mapStateToProps = ({auth,events}) => {
  return {
    authStatus: auth.authStatus,
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