import React from 'react'
import renderer from 'react-test-renderer'
import MyBookingsListItem from '.'

it('MyBookingsListItem: default', () => {
  const component = renderer.create(<MyBookingsListItem />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
