
import React, {useState} from 'react'
import styles from './Event.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import FavStar from '../FavStar';
import EventDetails from '../EventDetails';
import Card from '../Card';

const Event = props => {

  const [expand, setExpand] = useState(false);
  const expandToggle = () => setExpand( expand => !expand );

  let metaFields = {}

  if (props.metadata) {
    props.metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }

  const favStarStatus = props.favEvents.includes(props.id)

  const favStarToggle = () => {
      if (favStarStatus) {
        props.removeFavEvent(props.id);
      } else props.addFavEvent(props.id);
  }

  const convertTime = (time) => {
    switch (time) {
      case "00:00:00":
        return ""
      default:
        return toStandardTime(time)
    }
  }

  function toStandardTime(militaryTime) {
    militaryTime = militaryTime.split(':');
    if (militaryTime[0].charAt(0) === 2 || (militaryTime[0].charAt(0) === 1 && militaryTime[0].charAt(1) > 2)) {
      return (militaryTime[0] - 12) + ':' + militaryTime[1] + 'pm';
    } else if (militaryTime[0].charAt(0) === 0) {
      return militaryTime[0].charAt(1) + ':' + militaryTime[1] + 'am';
    } else {
      return militaryTime[0] + ':' + militaryTime[1] + 'am';
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
        <div className={`${styles.Event} ${expand ? styles.Active : null}`}>
          <div className={styles.Eventsummary}>
            <div className={styles.TitleColumn} onClick={expandToggle}>
              <div className={styles.Title}>{props.name}</div>
              <div className={styles.System}>{metaFields.System}</div>
            </div>
            <div className={styles.TimeColumn} onClick={expandToggle}>
              <div className={styles.Date}>{convertDate(props.startDate)}</div>
              <div className={styles.Time}>{convertTime(props.startTime)} - {convertTime(props.endTime)}</div>
            </div>
          </div>
          <div className={styles.FavStar}><FavStar fav={favStarStatus} click={favStarToggle}/></div>
          {expand ? <EventDetails click={expandToggle} description={props.description} meta={metaFields} categories={props.categories}/> : null}
        </div>
      </Card>
    )
  } else return null
}

const mapStateToProps = state => {
  return {
      favEvents: state.favEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.changeFavsAdd(id)),
    removeFavEvent: (id) => dispatch(actions.changeFavsRemove(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)