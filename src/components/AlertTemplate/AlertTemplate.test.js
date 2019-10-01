import React from 'react'
import renderer from 'react-test-renderer'
import AlertTemplate from '.'

it('AlertTemplate: default', () => {
  const component = renderer.create(<AlertTemplate />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
