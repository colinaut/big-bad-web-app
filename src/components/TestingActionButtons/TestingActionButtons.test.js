import React from 'react'
import renderer from 'react-test-renderer'
import TestingActionButtons from '.'

it('TestingActionButtons: default', () => {
  const component = renderer.create(<TestingActionButtons />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
