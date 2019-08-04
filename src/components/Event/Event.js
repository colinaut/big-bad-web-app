
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react'
import useToggle from 'react-use-toggle';

import * as actions from '../../store/actions';
import Card from '../Card';
import EventDetails from '../EventDetails';

import { ReactComponent as Star } from '../../assets/star.svg';
import styles from './Event.module.css';

const Event = props => {

  const [expandToggle, toggleExpand] = useToggle(false);

  let metaFields = {}

  if (props.metadata) {
    props.metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }

  const favStarStatus = props.favEvents.includes(props.id)

  const favStarStyle = (props.favEvents.includes(props.id)) ? [styles.FavStar, styles.FavStarActive].join(' ') : styles.FavStar;

  const toggleFavStar = () => {
      if (favStarStatus) {
        props.removeFavEvent(props.id);
      } else props.addFavEvent(props.id);
  }

  const convertTime = (time) => {
    switch (time) {
      case "00:00:00":
        return ""
      default:
        return moment(time,"HH:mm:ss").format("h:mma")
    }
  }

  const convertDate = (date) => {
    switch (date) {
      case "2019-10-10":
        return "Thursday, 10th"
      case "2019-10-11":
        return "Friday, 11th"
      case "2019-10-12":
        return "Saturday, 12th"
      case "2019-10-13":
        return "Sunday, 13th"
      default:
          return "Date/Time TBA"
    }
  }

  const categoriesSlugArray = props.categories.map((cat) => { return cat.categorySlug })

  const displayEvent = () => {
    if (props.filters.favs && !favStarStatus) return false;
    if (props.filters.days !== "all" && props.filters.days !== props.startDate) return false;
    if (props.filters.categories !== "all" && !categoriesSlugArray.includes(props.filters.categories)) return false;
    return true;
  }


  if (displayEvent()) {
    return (
      <Card>
        <div className={`${styles.Event} ${expandToggle ? styles.Active : null}`}>
          <div className={styles.Eventsummary}>
            <div className={styles.TitleColumn} onClick={toggleExpand}>
              <div className={styles.Title}>{props.name}</div>
              <div className={styles.System}>{metaFields.System}</div>
            </div>
            <div className={styles.TimeColumn} onClick={toggleExpand}>
              <div className={styles.Date}>{convertDate(props.startDate)}</div>
              <div className={styles.Time}>{convertTime(props.startTime)} - {convertTime(props.endTime)}</div>
            </div>
          </div>
          <div className={styles.FavStarWrapper}><Star className={favStarStyle} onClick={toggleFavStar} /></div> 
          {expandToggle ? <EventDetails click={toggleExpand} gm={props.eventOwner.displayName} description={props.description} meta={metaFields} categories={props.categories}/> : null}
        </div>
      </Card>
    )
  } else return null
}

const mapStateToProps = ({events}) => {
  return {
      favEvents: events.favEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.changeFavsAdd(id)),
    removeFavEvent: (id) => dispatch(actions.changeFavsRemove(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)