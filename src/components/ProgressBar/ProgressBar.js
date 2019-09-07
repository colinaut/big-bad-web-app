import React from 'react'
import styles from './ProgressBar.module.css';

const ProgressBar = props => {
  const {color, percentage, animate} = props
  const isAnimated = animate ? 'animate' : null
  const className = [styles.ProgressBar, styles[isAnimated], styles[color]].join(' ')
  const barWidth = percentage <= 100 ? `${percentage}%` : '100%'
  return (
    <div className={className}>
      <div className={styles.OuterBar} style={{width:barWidth}}><div className={styles.InnerBar}></div></div>
    </div>
  )
}

export default ProgressBar