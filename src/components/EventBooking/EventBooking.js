import React, {Fragment} from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Button from '../Button'

const EventBooking = props => {

  const {
    id,
    bookings = [],
    metadata,
    myEvents,
    myAvailableGameSlots,
    userId,
  } = props

  let metaDataObject = {}

  if (metadata) {
    metadata.map((meta)=> {
      return metaDataObject = {...metaDataObject, [meta.metaKey]:meta.metaValue}
    })
  }

  let gameSlotText
  
  if (myAvailableGameSlots === 1) { gameSlotText = `You have ${myAvailableGameSlots} Game Slot Available` } 
  else if (myAvailableGameSlots > 1) { gameSlotText = `You have ${myAvailableGameSlots} Game Slots Available` }
  else if (myAvailableGameSlots === 0) { gameSlotText = `You have no bookings left!` }
  else if (myAvailableGameSlots < 0) { gameSlotText = `We're sorry something went wrong and you are overbooked! Please cancel ${-1*myAvailableGameSlots} of your bookings` }

  const playerList = bookings.filter(booking => booking.bookingStatus === 1 && booking.bookingComment === null).map(booking => { return {bookingId: booking.bookingId, bookingComment: booking.bookingComment, displayName: booking.user.displayName, userId: booking.user.id}})
  const gm = bookings.filter(booking => booking.bookingStatus === 1 && booking.bookingComment)[0]

  const isBookedIntoGame = myEvents.includes(id) || playerList.some(player => player.userId === userId)

  const btnStyle = {
    margin: '0'
  }

  const bookingSwitch = () => {
    if (!metaDataObject.Players) {
      return <p className={styles.NoBookings}>There is no pre-booking for this event</p>
    } else if (isBookedIntoGame) {
      return (
        <Fragment>
          { metaDataObject.exempt ? <p className={styles.Exempt}>This game is exempt from your quota</p> : <p className={styles.GameSlots}>{gameSlotText}</p>}
          <p className={styles.YouAreBooked}>You are booked into this event!</p>
          <Button style={btnStyle} clicked={()=> props.removeMeFromGame(id)} btnType='Danger'>Cancel Booking</Button>
        </Fragment>
      )
    } else if (!metaDataObject.exempt && myAvailableGameSlots < 1) {
      return <p className={styles.GameSlots}>{gameSlotText}</p>
    } else if (metaDataObject.players - playerList.length <= 0) {
      return <p className={styles.Full}>This event is full.</p>
    } else {
      return (
        <Fragment>
          { metaDataObject.exempt ? <p className={styles.Exempt}>This game is exempt from your quota</p> : <p className={styles.GameSlots}>{gameSlotText}</p>}
          { props.isAdmin ? <Button style={btnStyle} clicked={()=> props.bookMeIntoGame(id)}>Book Event</Button> : null } {/* IMPORTANT TODO: Remove isAdmin before publishing for public */}
        </Fragment>
      )
    }
  }

  return props.bookings ? (
    <div className={styles.EventBooking}>
      {gm ? <h3 className={styles.GM}><strong>{gm.bookingComment}:</strong> {gm.user.displayName}</h3> : null}
      {metaDataObject.players ? <h3 className={styles.Heading}>Event Bookings:
        <span className={styles.AvailableSlots}>(Openings: <strong className={styles.AvailableSlotsNumber}>{metaDataObject.players - playerList.length} of {metaDataObject.players}</strong>)</span>
      </h3> : null}
      {playerList ? 
      <div className={styles.PlayersListWrapper}>
        <ul className={styles.PlayersList}>
          {playerList.map(player => <li className={styles.PlayersListItem} key={player.bookingId}>{player.displayName}</li>)}
        </ul> 
      </div>: null}
      {metaDataObject.volunteer_shift ? <p className={styles.Volunteer}>You must be a volunteer to sign up for this.</p> : null}
      <div className={styles.BookingSwitch}>{bookingSwitch()}</div>
    </div>
  ) : null
}

const mapStateToProps = ({events, booking, auth}, ownProps) => {
  return {
      bookings: events.eventsById[ownProps.id].bookings,
      metadata: events.eventsById[ownProps.id].metadata,
      myEvents: booking.myEvents,
      myAvailableGameSlots: booking.myAvailableGameSlots,
      userId: auth.userData.id,
      isAdmin: auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bookMeIntoGame: (id)=> dispatch(actions.bookMeIntoGame(id)),
    removeMeFromGame: (id) => dispatch(actions.removeMeFromGame(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)