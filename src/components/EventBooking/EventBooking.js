import React from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Button from '../Button'

const EventBooking = props => {

  const {id,bookings,metadata,myEvents,myAvailableGameSlots} = props

  const players = metadata.find(data => data.metaKey === 'Players').metaValue

  const gameSlotText = (myAvailableGameSlots === 1) ? `You have ${myAvailableGameSlots} Game Slot Available` : `You have ${myAvailableGameSlots} Game Slots Available`

  const playerList = bookings.filter(booking => booking.bookingComment !== 'GM').map(booking => { return {bookingId: booking.bookingId, displayName: booking.user.displayName}})

  const btnStyle = {
    margin: '0'
  }

  const bookingSwitch = () => {
    if (myEvents.includes(id)) {
      return (
        <div className={styles.Booked}>
          <p className={styles.YouAreBooked}>You are booked into this event!</p>
          <Button style={btnStyle} clicked={()=> props.removeMeFromGame(id)} btnType='Danger'>Cancel Booking</Button>
        </div>
      )
    } else if (myAvailableGameSlots < 1) {
      return (
        <div className={styles.OverBooked}>
          <p className={styles.YouAreOverBooked}>You have no bookings left!</p>
        </div>
      )
    } else {
      return (
        <div className={styles.NotBooked}>
          <p className={styles.GameSlots}>{gameSlotText}</p>
          <Button style={btnStyle} clicked={()=> props.bookMeIntoGame(id)}>Book Event</Button>
        </div> 
      )
    }
  }

  return props.bookings ? (
    <div className={styles.EventBooking}>
      <h3 className={styles.Heading}>Event Bookings:
        <span className={styles.AvailableSlots}>(Available Slots: <strong className={styles.AvailableSlotsNumber}>{players - bookings.length + 1} of {players}</strong>)</span>
      </h3>
      {playerList ? 
      <div className={styles.PlayersListWrapper}>
        <ul className={styles.PlayersList}>
          {playerList.map(player => <li className={styles.PlayersListItem} key={player.bookingId}>{player.displayName}</li>)}
        </ul> 
      </div>: null}
      {bookingSwitch()}
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
    removeMeFromGame: (id) => dispatch(actions.removeMeFromGame(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)