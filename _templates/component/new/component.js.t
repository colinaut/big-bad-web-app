---
to: src/components/<%= name %>/<%= name %>.js
---
<% const comp = h.inflection.undasherize(name) -%>

<% if(locals.class || locals.c) { -%>
import React, { Component } from 'react';
import styles from './<%= name %>.module.css';

class <%= comp %> extends Component {
  render() {
    return <div className={styles.<%= comp %>}></div>
  }
}
<% } else if(locals.functional || locals.f) { -%>
import React from 'react'
import styles from './<%= name %>.module.css';

const <%= comp %> = props => {
  return (
    <div className={styles.<%= comp %>}></div>
  )
}
<% } else if(locals.stateful|| locals.s) { -%>
import React, {useState} from 'react'
import styles from './<%= name %>.module.css';

const <%= comp %> = props => {

  const [currentState, setState] = useState();

  return (
    <div className={styles.<%= comp %>}></div>
  )
}
<% } else if(locals.pure || locals.p) { -%>
import React, { PureComponent } from 'react';

class <%= comp %> extends PureComponent {
  render() {
    return <div>edit me: at components/<%= name %>/index.js</div>
  }
}
<% } else { -%>
import React from 'react';

const <%= comp %> = props => 
<% } -%>

export default <%= comp %>