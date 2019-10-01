
import { connect } from 'react-redux';
import React, {Fragment, useMemo} from 'react'
import useToggle from 'react-use-toggle';
import moment from 'moment';

import * as actions from '../../store/actions';
import EventDetails from '../EventDetails';
import EventBooking from '../EventBooking';
import {convertTime, convertDate} from '../../util/helpers';
import CloseAccordianBtn from '../CloseAccordianBtn'

import { ReactComponent as Star } from '../../assets/star.svg';
import styles from './Event.module.css';
import getMarkup from '../../util/getMarkup';
import decodeText from '../../util/decodeText';

const Event = props => {

  const {
    id,
    filters,
    event = {bookings:[]},
    favEvents = [],
    authStatus,
    myEvents = [],
    deleteFavEvent,
    addFavEvent,
    fetchEvent,
  } = props

  const [detailsToggle, toggleDetails] = useToggle(false);

  const eventStyle = (detailsToggle) ? [styles.Event, styles.Active].join(' ') : styles.Event;
  const eventSummaryStyle = (myEvents.includes(id)) ? [styles.Eventsummary, styles.MyEvent].join(' ') : styles.Eventsummary;
  const detailsStyle = (detailsToggle) ? [styles.Details, styles.DetailsActive].join(' ') : styles.Details;

  const favStarStatus = favEvents.includes(id)
  const favStarStyle = (favEvents.includes(id)) ? [styles.FavStar, styles.FavStarActive].join(' ') : styles.FavStar;

  const toggleFavStar = () => {
    if (favStarStatus) {
      deleteFavEvent(id);
    } else addFavEvent(id);
  }

  const numberOfPlayers = event.bookings ? event.bookings.filter(booking => booking.bookingComment === null).length : 0
  const availabileSlots = event.metadata ? event.metadata.Players - numberOfPlayers : null
  
  const categoriesSlugArray = event.categories ? event.categories.map((cat) => { return cat.slug }) : null

  // Create time chunks for filter

  
    const {eventStartTime} = event

    const timeChunk = useMemo(()=>{
      const startTime = moment(eventStartTime,"HH:mm:ss")
      const aftermidnight = moment('00:00:00',"HH:mm:ss")
      const noon = moment('12:00:00',"HH:mm:ss")
      const evening = moment('18:00:00',"HH:mm:ss")
      const midnight = moment('24:00:00',"HH:mm:ss")

      if (startTime >= aftermidnight && startTime < noon) return 'Morning'
      if (startTime >= noon && startTime < evening) return 'Afternoon'
      if (startTime >= evening && startTime <= midnight) return 'Evening'
      return null
    },[eventStartTime])
   
  const toggleDetailsHandler = () => {
    if (authStatus && !detailsToggle) fetchEvent(id) //Fetch the Event info again on opening the details as long as user is logged in.
    toggleDetails()
    console.log(event)
  }

  const displayEvent = () => {
    //if (event.eventStatus !== 1) return false;
    if (authStatus && filters.favs && !favStarStatus) return false;
    if (authStatus && filters.availability && availabileSlots < 1) return false;
    if (authStatus && filters.exempt && event.metadata.exempt !== '1') return false;
    if (filters.dates !== "all" && filters.dates !== event.eventStartDate) return false;
    if (filters.categories !== "all" && !categoriesSlugArray.includes(filters.categories)) return false;
    if (filters.times !== "all" && filters.times !== timeChunk) return false;
    return true;
  }

  const title = event.eventName ? getMarkup(decodeText(event.eventName)) : null
  const system = event.eventSystem ? getMarkup(decodeText(event.eventSystem)) : null

  return (displayEvent()) ? (
    <div className={eventStyle}>
      <div className={eventSummaryStyle}>
        <div className={styles.TitleColumn} onClick={toggleDetailsHandler}>
          <div className={styles.Title} dangerouslySetInnerHTML={title} />
          {event.eventSystem ? <div className={styles.System} dangerouslySetInnerHTML={system} /> : null}
        </div>
        <div className={styles.TimeColumn} onClick={toggleDetailsHandler}>
          <div className={styles.Date}>{convertDate(event.eventStartDate, "dddd, Do")}</div>
          <div className={styles.Time}>{convertTime(event.eventStartTime)}&ndash;{convertTime(event.eventEndTime)}</div>
        </div>
      </div>
      { authStatus ? <div className={styles.FavStarWrapper}><Star className={favStarStyle} onClick={toggleFavStar} /></div> : null}
      {detailsToggle ? 
        <Fragment>
          <div className={detailsStyle} >
            <EventDetails description={event.postContent} metadata={event.metadata} categories={event.categories}/> 
            { (authStatus && event.bookings) ? <EventBooking id={id} /> : null }
          </div> 
          <CloseAccordianBtn close={toggleDetails} color='Red' />
        </Fragment>
        : null }
    </div>
  ) : null
}

const mapStateToProps = ({auth,booking,events},ownProps) => {
  return {
      favEvents: booking.favEvents,
      authStatus: auth.authStatus,
      myEvents: booking.myEvents,
      event: events.eventsById ? events.eventsById[ownProps.id] : null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.addFavEvent(id)),
    deleteFavEvent: (id) => dispatch(actions.deleteFavEvent(id)),
    fetchEvent: (id) => dispatch(actions.fetchEvent(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)