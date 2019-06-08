import React from 'react'
import renderer from 'react-test-renderer'
import Eventsfilter from '.'

it('Eventsfilter: default', () => {
  const component = renderer.create(<Eventsfilter />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
