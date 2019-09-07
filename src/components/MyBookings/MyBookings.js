import React, {useEffect} from 'react'
import styles from './MyBookings.module.css';
import { connect } from 'react-redux';
import MyBookingsListItem from '../MyBookingsListItem';
import * as actions from '../../store/actions';

const MyBookings = props => {
  const {myEvents, myAvailableGameSlots, fetchMyEvents,fetchMyAvailableGameSlots} = props;

  const gameSlotText = (myAvailableGameSlots === 1) ? `You have ${myAvailableGameSlots} Game Slot Available` : `You have ${myAvailableGameSlots} Game Slots Available`

  useEffect(()=>{
    fetchMyEvents()
    fetchMyAvailableGameSlots()
  },[fetchMyEvents,fetchMyAvailableGameSlots])

  return (
    <div className={styles.MyBookings}>
      <h4 className={styles.Header}>My Bookings</h4>
      { (myEvents && myEvents.length > 0) ? 
        <ul className={styles.List}> 
          {myEvents.map( eventId => <MyBookingsListItem key={eventId} eventId={eventId}/>)}
        </ul>
      : <p>No events booked yet!</p> }
      <div className={styles.GameSlots}>
        {gameSlotText}
      </div>
    </div>
  )
}

const mapStateToProps = ({booking}) => {
  return {
      myEvents: booking.myEvents,
      myAvailableGameSlots: booking.myAvailableGameSlots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMyEvents: () => dispatch(actions.fetchMyEvents()),
    fetchMyAvailableGameSlots: () => dispatch(actions.fetchMyAvailableGameSlots())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings)