import React from 'react'
import renderer from 'react-test-renderer'
import CountdownClock from '.'

it('CountdownClock: default', () => {
  const component = renderer.create(<CountdownClock />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
