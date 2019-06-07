import React from 'react'
import renderer from 'react-test-renderer'
import Eventsummary from '.'

it('Eventsummary: default', () => {
  const component = renderer.create(<Eventsummary />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
