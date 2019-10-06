
import { connect } from 'react-redux';
import React, {useState, useEffect} from 'react'
import uuid from 'react-uuid';

import {convertDate} from '../../util/helpers';
import {transformObjectToArray, dynamicSort} from '../../util/helpers';
import Event from '../Event';
import EventsFilter from '../EventsFilter';

import { ReactComponent as D6 } from '../../assets/die-6.svg'
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as Marker } from '../../assets/marker.svg';
//import { ReactComponent as Exempt } from '../../assets/square-add-button.svg';
import styles from './EventList.module.css';

const EventList = props => {

  const {
    categories = [], 
    dates = [],
    timeChunks = ['Morning','Afternoon','Evening'],
    sortedEventsByDate = [],
    sortedEventsByName = [],
    sortedEventsBySystem = [],
  } = props;

  // SORTED EVENTS

  const sortOrders = [
    {name:'Date', data:sortedEventsByDate},
    {name:'Name', data:sortedEventsByName},
    {name:'System',data:sortedEventsBySystem}
  ]
  const [sortedEvents,setSortedEvents] = useState(sortOrders[0])

  // FILTERS
  const [currentFilters, setCurrentFilters] = useState({categories: 'all',dates: 'all', times: 'all', availability:false, exempt:false, favs:false});

  // Setting up all the Filter buttons
  const [filterButtons, setFilterButtons] = useState({
    categories: {
      priority: 0,
      label: "Category",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
        ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})]
    },
    dates: {
      priority: 1,
      label: "Day",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('dates','all'), active: true }, 
        ...dates.map(d => { return {slug:d, name: convertDate(d,'ddd'), click: ()=>filterList("dates",d),active:false}})] 
    },
    times: {
      priority: 2,
      label: "Time",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('times','all'), active: true }, 
        ...timeChunks.map(t => { return {slug:t, name: t, click: ()=>filterList("times",t),active:false}})] 
    },
    availability: {
      priority: 3,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "open",
          name:"Open",
          icon: D6,
          click:() => filterToggle('availability'),
          active: false
        }
      ]
    },
    /* exempt: {
      priority: 4,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "exempt",
          name:"Exempt",
          icon: Exempt,
          click:() => filterToggle('exempt'),
          active: false
        }
      ]
    }, */
    booked: { 
      priority: 5,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "booked",
          name:"My Bookings",
          icon: Marker,
          click:() => filterToggle('booked'),
          active: false
        }
      ]
    },
    favs: { 
      priority: 6,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "favs",
          name:"Favs",
          icon: Star,
          click:() => filterToggle('favs'),
          active: false
        }
      ]
    }
  });

  useEffect(()=>{  //change categories filter buttons when categories change
    const categoryButtons = [
      { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
      ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})] 

    setFilterButtons(prevState => { 
      return {...prevState, categories:{...prevState.categories, buttons:categoryButtons }}
    })
  },[categories])

  useEffect(()=>{  //change date filter buttons when categories change
    const dateButtons = [
      { slug:"all", name:"All", click:()=>filterList('dates','all'), active: true }, 
      ...dates.map(d => { return {slug:d, name: convertDate(d,'ddd'), click: ()=>filterList("dates",d),active:false}})] 

    setFilterButtons(prevState => { 
      return {...prevState, dates:{...prevState.dates, buttons:dateButtons }}
    })
  },[dates])

  const filterList = (type,filter) => {
    setCurrentFilters(prevState => { return {...prevState, [type]:filter}});

    setFilterButtons(prevState => { 
      const resetButtons = prevState[type].buttons.map(button => button.slug === filter ? {...button, active: true} : {...button, active: false})
      return {...prevState, [type]:{...prevState[type], buttons:resetButtons }}
    });
  }

  const filterToggle = (type) => {
    setCurrentFilters(prevState => { return {...prevState, [type]:!prevState[type]}});

    setFilterButtons(prevState => { 
      const resetButtons = prevState[type].buttons.map(button => { return {...button, active: !button.active} })
      return {...prevState, [type]:{...prevState[type], buttons:resetButtons }}
    });
  }
  
  return (
    <div className={styles.EventlistWrapper}>
      <div className={styles.EventsSort}>
        <h4>Sort by:</h4>
        { sortOrders.map( sortButton => {
            return (
              <button
                key={sortButton.name}
                className={(sortedEvents.name === sortButton.name) ? [styles.SortButton, styles.On].join(' ') : styles.SortButton} 
                onClick={()=> setSortedEvents(sortButton)} 
              ><span className={styles.Name}>{sortButton.name}</span></button>
            )
          })
        }
      </div>
      <EventsFilter buttonPanel={transformObjectToArray(filterButtons).sort(dynamicSort('priority'))}/>
      <div className={styles.Eventlist}>
        {sortedEvents.data.map(id => (
          <Event 
            key={id + uuid()}
            id={id}
            filters={currentFilters}
            />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({events}) => {
  return {
    categories: events.categories,
    dates: events.dates,
    times: events.times,
    sortedEventsByDate: events.sortedEventsByDate,
    sortedEventsByName: events.sortedEventsByName,
    sortedEventsBySystem: events.sortedEventsBySystem,
  }
}

export default connect(mapStateToProps)(EventList)