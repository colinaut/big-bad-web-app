import React from 'react'
import styles from './MyBookings.module.css';
import { connect } from 'react-redux';
import MyBookingsListItem from '../MyBookingsListItem'

const MyBookings = props => {
  const {myEvents, myAvailableGameSlots} = props;

  const gameSlotText = (myAvailableGameSlots === 1) ? `You have ${myAvailableGameSlots} Game Slot Available` : `You have ${myAvailableGameSlots} Game Slots Available`


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

export default connect(mapStateToProps)(MyBookings)