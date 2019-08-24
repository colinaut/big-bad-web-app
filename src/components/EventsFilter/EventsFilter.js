import React from 'react'
import styles from './EventsFilter.module.css';
import { connect } from 'react-redux';

const EventsFilter = props => {
  const {buttonPanel,authStatus} = props
  
  return buttonPanel ? (
    <div className={styles.Eventsfilter}>
      {buttonPanel.map((panel)=>{
        return (!authStatus && panel.authOnly) ? null : <ButtonPanel panel={panel} key={panel.id}/>;
      })}
    </div>
  ) : null
}

const ButtonPanel = (props) => {

  const {panel} = props

  return (
    <div className={styles.Panel}>
      {panel.label ? <h4 className={styles.PanelLabel}>{panel.label}</h4> : null}
      {panel.icon ? <panel.icon className={`${styles.PanelIcon} ${styles[panel.id]}`}/> : null}
      {panel.buttons.map((button)=>{
        return <FilterButton key={button.slug} button={button} />
      })}
    </div>
  )
}

const FilterButton = ({button}) => {
  const {
    name,
    active,
    click,
    icon
  } = button;

  const BtnIcon = icon

  return (
    <button className={`${styles.FilterButton} ${active ? styles.On : styles.Off} ${styles[name]}`} onClick={click}>
      {icon ? <BtnIcon className={styles.BtnIcon} /> : null}
      <span className={styles.Name}>{name}</span>
    </button>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus,
  }
}

export default connect(mapStateToProps)(EventsFilter)