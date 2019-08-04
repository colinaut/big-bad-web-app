
import { connect } from 'react-redux';
import React from 'react'
import useToggle from 'react-use-toggle';

import * as actions from '../../store/actions';
import Card from '../Card';
import EventDetails from '../EventDetails';
import EventBooking from '../EventBooking';
import {convertTime, convertDate} from '../../util/helpers';

import { ReactComponent as Star } from '../../assets/star.svg';
import styles from './Event.module.css';

const Event = props => {

  const [detailsToggle, toggleDetails] = useToggle(false);

  const detailsStyle = (detailsToggle) ? [styles.Details, styles.DetailsActive].join(' ') : styles.Details;

  const favStarStatus = props.favEvents.includes(props.id)

  const favStarStyle = (props.favEvents.includes(props.id)) ? [styles.FavStar, styles.FavStarActive].join(' ') : styles.FavStar;

  const toggleFavStar = () => {
      if (favStarStatus) {
        props.removeFavEvent(props.id);
      } else props.addFavEvent(props.id);
  }

  let metaFields = {}

  if (props.metadata) {
    props.metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }

  const categoriesSlugArray = props.categories.map((cat) => { return cat.slug })

  const displayEvent = () => {
    if (props.filters.favs && !favStarStatus) return false;
    if (props.filters.dates !== "all" && props.filters.dates !== props.startDate) return false;
    if (props.filters.categories !== "all" && !categoriesSlugArray.includes(props.filters.categories)) return false;
    return true;
  }

  if (displayEvent()) {
    return (
      <Card>
        <div className={`${styles.Event} ${detailsToggle ? styles.Active : null}`}>
          <div className={styles.Eventsummary}>
            <div className={styles.TitleColumn} onClick={toggleDetails}>
              <div className={styles.Title}>{props.name}</div>
              <div className={styles.System}>{metaFields.System}</div>
            </div>
            <div className={styles.TimeColumn} onClick={toggleDetails}>
              <div className={styles.Date}>{convertDate(props.startDate)}</div>
              <div className={styles.Time}>{convertTime(props.startTime)} - {convertTime(props.endTime)}</div>
            </div>
          </div>
          <div className={styles.FavStarWrapper}><Star className={favStarStyle} onClick={toggleFavStar} /></div> 
          {detailsToggle ? 
            <div className={detailsStyle} onClick={toggleDetails}>
              <EventDetails eventOwner={props.eventOwner} description={props.description} meta={metaFields} categories={props.categories}/> 
              { props.authStatus ? <EventBooking /> : null }
            </div> 
            : null }
        </div>
      </Card>
    )
  } else return null
}

const mapStateToProps = ({events, auth}) => {
  return {
      favEvents: events.favEvents,
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.changeFavsAdd(id)),
    removeFavEvent: (id) => dispatch(actions.changeFavsRemove(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)