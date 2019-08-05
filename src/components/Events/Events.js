import { connect } from 'react-redux';
import React, {useEffect} from 'react';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

import styles from './Events.module.css';

const Events = props => {

  const {events,fetchEvents,} = props;

  useEffect(()=>{
    if (!events || (events && events.length < 1)) {fetchEvents()}
    
  },[events,fetchEvents,])

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      {props.events ? <EventList dates={props.dates} categories={props.categories} events={props.events} /> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      categories: events.categories,
      dates: events.dates,
      events: events.events,
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