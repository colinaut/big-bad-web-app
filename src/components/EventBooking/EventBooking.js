import React from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Button from '../Button'

const EventBooking = props => {

  const {id,bookings,metadata,myEvents,myAvailableGameSlots} = props

  const players = metadata.find(data => data.metaKey === 'Players').metaValue

  const gameSlotText = (myAvailableGameSlots === 1) ? `You have ${myAvailableGameSlots} Game Slot Available` : `You have ${myAvailableGameSlots} Game Slots Available`

  return props.bookings ? (
    <div className={styles.EventBooking}>
      <h3 className={styles.Heading}>Event Bookings:
        <span className={styles.AvailableSlots}>(Available Slots: <strong className={styles.AvailableSlotsNumber}>{players - bookings.length + 1} of {players}</strong>)</span>
      </h3>
      {(myEvents.includes(id)) ? 
        <div className={styles.Booked}><p className={styles.YouAreBooked}>You are booked into this event!</p><Button clicked={()=> props.unbookMeFromGame(id)} btnType='Danger'>Cancel Booking</Button></div> 
      : <div className={styles.NotBooked}>
          <p className={styles.GameSlots}>{gameSlotText}</p>
          <Button clicked={()=> props.bookMeIntoGame(id)}>Book Event</Button>
        </div> 
      }
    </div>
  ) : null
}

const mapStateToProps = ({events, booking}, ownProps) => {
  return {
      bookings: events.eventsById[ownProps.id].bookings,
      metadata: events.eventsById[ownProps.id].metadata,
      myEvents: booking.myEvents,
      myAvailableGameSlots: booking.myAvailableGameSlots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bookMeIntoGame: (id)=> dispatch(actions.bookMeIntoGame(id)),
    unbookMeFromGame: (id) => dispatch(actions.unbookMeFromGame(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)