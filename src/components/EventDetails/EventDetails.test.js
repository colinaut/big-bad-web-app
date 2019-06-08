import React from 'react'
import renderer from 'react-test-renderer'
import Eventdetails from '.'

it('Eventdetails: default', () => {
  const component = renderer.create(<Eventdetails />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
