
import React, {useState} from 'react'
import styles from './EventList.module.css';
import Event from '../Event';
import EventsFilter from '../EventsFilter'
import useToggle from 'react-use-toggle';

const Eventlist = props => {
  
  const [eventsFilter, setEventsFilter] = useState(props.events);

  const filterEvents = (name,filter) => {
    const newFilter = props.events.filter((event) => {
      return event[name] === filter;
    });
    setEventsFilter( newFilter );
  }

  const filterCategories = (filter) => {
    const newFilter = props.events.filter((element) => element.categories.some((cat) => cat.categorySlug === filter))
    setEventsFilter( newFilter );
  }

  const [favFilter, toggleFavFilter] = useToggle(false);

  const unfilterEvents = () => setEventsFilter( props.events )

  const filterButtons = [
    {
      name: "categories",
      label: "Categories",
      buttons: [
        {
          name:"All",
          click:()=>unfilterEvents()
        },
        {
          name:"RPG",
          click:()=>filterCategories("rpg")
        },
        {
          name:"LARP",
          click:()=>filterCategories("larp")
        },
        {
          name:"Teen",
          click:()=>filterCategories("teen")
        },
        {
          name:"Boardgame",
          click:()=>filterCategories("boardgame")
        },
        {
          name:"Panel",
          click:()=>filterCategories("panel")
        },
        {
          name:"Workshop",
          click:()=>filterCategories("workshop")
        }
      ]
    },
    {
      name: "days",
      label: "Day",
      buttons: [
        {
          name:"All",
          click:()=>unfilterEvents()
        },
        {
          name:"Thurs",
          click:()=>filterEvents("eventStartDate","2019-10-10")
        },
        {
          name:"Fri",
          click:()=>filterEvents("eventStartDate","2019-10-11")
        },
        {
          name:"Sat",
          click:()=>filterEvents("eventStartDate","2019-10-12")
        },
        {
          name:"Sun",
          click:()=>filterEvents("eventStartDate","2019-10-13")
        }
      ]
    },
    {
      name: "favs",
      label: false,
      buttons: [
        {
          name:"Favs",
          click:toggleFavFilter
        }
      ]
    }
  ]
  
  return (
    <div className={styles.EventlistWrapper}>
      <EventsFilter buttonPanel={filterButtons}/>
      
      <div className={styles.Eventlist}>
        {eventsFilter.map((event) => (
          
          <Event 
            key={event.eventId}
            id={event.eventId}
            name={event.eventName} 
            startDate={event.eventStartDate}
            endDate={event.eventEndDate}
            startTime={event.eventStartTime}
            endTime={event.eventEndTime}
            description={event.postContent}
            categories={event.categories}
            eventOwner={event.eventOwner}
            metadata={event.metadata}
            filterFavs={favFilter}
            />
        ))}
      </div>
    </div>
  )
}

export default Eventlist