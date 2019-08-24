import { connect } from 'react-redux';
import React, {useEffect} from 'react';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

import styles from './Events.module.css';

const Events = props => {

  const {
    sortedEventsArray,
    categories,
    dates,
    fetchEvents
  } = props;

  useEffect(()=>{
    if (!sortedEventsArray || (sortedEventsArray && sortedEventsArray.length < 1)) {fetchEvents()}
  },[sortedEventsArray,fetchEvents,])

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      {sortedEventsArray ? <EventList dates={dates} categories={categories} sortedEventsArray={sortedEventsArray} events={props.events} /> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      categories: events.categories,
      dates: events.dates,
      sortedEventsArray: events.sortedEventsArray,
      epochtime: events.epochtime,
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)