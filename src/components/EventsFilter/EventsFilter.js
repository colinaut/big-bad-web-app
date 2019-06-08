
import React from 'react'
import styles from './EventsFilter.module.css';

const Eventsfilter = props => {
  
  
  return props.buttonPanel ? (
    <div className={styles.Eventsfilter}>
      {props.buttonPanel.map((panel)=>{
        return <ButtonPanel panel={panel} key={panel.name}/>
      })}
    </div>
  ) : null
}

const ButtonPanel = (props) => {
  return (
    <div className={styles.Panel} key={props.name}>
      <h4 className={styles.PanelLabel}>{props.panel.label}</h4>
      {props.panel.buttons.map((button)=>{
        return <FilterButton key={button.name} click={button.click} name={button.name} />
      })}
    </div>
  )
}

const FilterButton = (props) => <button className={styles.FilterButton} onClick={props.click}>{props.name}</button>

export default Eventsfilter