
import { connect } from 'react-redux';
import React, {Fragment} from 'react'
import useToggle from 'react-use-toggle';

import * as actions from '../../store/actions';
import EventDetails from '../EventDetails';
import EventBooking from '../EventBooking';
import {convertTime, convertDate} from '../../util/helpers';
import CloseAccordianBtn from '../CloseAccordianBtn'

import { ReactComponent as Star } from '../../assets/star.svg';
import styles from './Event.module.css';
import getMarkup from '../../util/getMarkup';

const Event = props => {

  const {
    favEvents,
    authStatus,
    myEvents,
    id,
    metadata,
    categories,
    eventOwner,
    name,
    description,
    filters,
    startDate,
    startTime,
    endTime,
    deleteFavEvent,
    addFavEvent,
    fetchEvent
  } = props

  const [detailsToggle, toggleDetails] = useToggle(false);

  const eventStyle = (detailsToggle) ? [styles.Event, styles.Active].join(' ') : styles.Event;
  const eventSummaryStyle = (myEvents && myEvents.includes(id)) ? [styles.Eventsummary, styles.MyEvent].join(' ') : styles.Eventsummary;
  const detailsStyle = (detailsToggle) ? [styles.Details, styles.DetailsActive].join(' ') : styles.Details;

  const favStarStatus = favEvents.includes(id)
  const favStarStyle = (favEvents.includes(id)) ? [styles.FavStar, styles.FavStarActive].join(' ') : styles.FavStar;


  const toggleFavStar = () => {
      if (favStarStatus) {
        deleteFavEvent(id);
      } else addFavEvent(id);
  }

  let metaFields = {}

  if (metadata) {
    metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }

  const categoriesSlugArray = categories.map((cat) => { return cat.slug })

  const toggleDetailsHandler = () => {
    if (authStatus && !detailsToggle) fetchEvent(id) //Fetch the Event info again on opening the details as long as user is logged in.
    toggleDetails()
  }

  const displayEvent = () => {
    if (filters.favs && !favStarStatus) return false;
    if (filters.dates !== "all" && filters.dates !== startDate) return false;
    if (filters.categories !== "all" && !categoriesSlugArray.includes(filters.categories)) return false;
    return true;
  }

  if (displayEvent()) {
    return (
      <div className={eventStyle}>
        <div className={eventSummaryStyle}>
          <div className={styles.TitleColumn} onClick={toggleDetailsHandler}>
            <div className={styles.Title} dangerouslySetInnerHTML={getMarkup(name)} />
            <div className={styles.System}>{metaFields.System}</div>
          </div>
          <div className={styles.TimeColumn} onClick={toggleDetailsHandler}>
            <div className={styles.Date}>{convertDate(startDate)}</div>
            <div className={styles.Time}>{convertTime(startTime)} - {convertTime(endTime)}</div>
          </div>
        </div>
        { authStatus ? <div className={styles.FavStarWrapper}><Star className={favStarStyle} onClick={toggleFavStar} /></div> : null}
        {detailsToggle ? 
          <Fragment>
            <div className={detailsStyle} >
              <EventDetails eventOwner={eventOwner} description={description} meta={metaFields} categories={categories}/> 
              { authStatus ? <EventBooking id={id} /> : null }
            </div> 
            <CloseAccordianBtn close={toggleDetails} color='Red' />
          </Fragment>
          : null }
      </div>
    )
  } else return null
}

const mapStateToProps = ({auth,booking}) => {
  return {
      favEvents: booking.favEvents,
      authStatus: auth.authStatus,
      myEvents: booking.myEvents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.addFavEvent(id)),
    deleteFavEvent: (id) => dispatch(actions.deleteFavEvent(id)),
    fetchEvent: (id) => dispatch(actions.fetchEvent(id))
  }
}

Event.defaultProps = {
  favEvents: []
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)