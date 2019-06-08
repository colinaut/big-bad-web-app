import React from 'react'
import renderer from 'react-test-renderer'
import Eventlist from '.'

it('Eventlist: default', () => {
  const component = renderer.create(<Eventlist />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
