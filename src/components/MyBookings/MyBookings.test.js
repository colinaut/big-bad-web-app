import React from 'react'
import renderer from 'react-test-renderer'
import MyBookings from '.'

it('MyBookings: default', () => {
  const component = renderer.create(<MyBookings />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
