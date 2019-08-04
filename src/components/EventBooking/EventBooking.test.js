import React from 'react'
import renderer from 'react-test-renderer'
import EventBooking from '.'

it('EventBooking: default', () => {
  const component = renderer.create(<EventBooking />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
