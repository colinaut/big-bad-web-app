import { connect } from 'react-redux';
import React from 'react'

import * as actions from '../../store/actions';
import Button from '../Button'

import styles from './TestingActionButtons.module.css';

const TestingActionButtons = props => {

  const buttonInlineStyle = {
    fontSize: '.7rem',
    margin: '.2rem 0'
  }
  return (
    <div className={styles.TestingActionButtons}>
      <h4 className={styles.Header}>Testing Actions</h4>
      <Button style={buttonInlineStyle} clicked={()=> props.fetchMyUserData()} btnType='Gray'>Fetch UserData</Button>
      <Button style={buttonInlineStyle} clicked={()=> props.fetchMyEvents()} btnType='Gray'>Fetch My Events</Button>
      <Button style={buttonInlineStyle} clicked={()=> props.fetchEvents()} btnType='Gray'>Fetch All Events</Button>
      <Button style={buttonInlineStyle} clicked={()=> props.fetchMyAvailableGameSlots()} btnType='Gray'>Fetch Game Slots</Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents()),
    fetchMyEvents: () => dispatch(actions.fetchMyEvents()),
    fetchMyUserData: () => dispatch(actions.fetchMyUserData()),
    fetchMyAvailableGameSlots: () => dispatch(actions.fetchMyAvailableGameSlots())
  }
}

export default connect(null,mapDispatchToProps)(TestingActionButtons)