import React from 'react';
import styles from './Layout.module.css';
import '../../styles/reset.css';
import '../../styles/typography.css'

const Layout = props => <div className={styles.Layout}>{props.children}</div>

export default Layout