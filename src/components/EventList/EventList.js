
import React, {useState} from 'react'
import styles from './EventList.module.css';
import Card from '../Card';
import Event from '../Event';
import EventsFilter from '../EventsFilter'

const Eventlist = props => {
  
  const [eventsFilter, setEventsFilter] = useState(props.events);

  const filterEvents = (name,filter) => {
    const newFilter = props.events.filter((event) => {
      return event[name] === filter;
    });
    setEventsFilter( newFilter );
  }

  const unfilterEvents = () => setEventsFilter( props.events )

  const filterButtons = [
    {
      name: "categories",
      label: "Categories",
      buttons: [
        {
          name:"All",
          click:()=>console.log("All")
        },
        {
          name:"RPGs",
          click:()=>console.log("RPGs")
        },
        {
          name:"LARPs",
          click:()=>console.log("LARPs")
        },
        {
          name:"Teens",
          click:()=>console.log("Teens")
        },
        {
          name:"Boardgames",
          click:()=>console.log("Boardgames")
        },
        {
          name:"Panels",
          click:()=>console.log("Panels")
        },
        {
          name:"Workshops",
          click:()=>console.log("Workshops")
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
          click:()=>console.log("Favs")
        }
      ]
    }
  ]
  
  return (
    <div className={styles.EventlistWrapper}>
      <EventsFilter buttonPanel={filterButtons}/>
      <div className={styles.Eventlist}>
        {eventsFilter.map((event) => (
          <Card key={event.eventId}>
            <Event 
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
              />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Eventlist