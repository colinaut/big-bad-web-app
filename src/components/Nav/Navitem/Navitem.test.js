import React from 'react'
import renderer from 'react-test-renderer'
import Navitem from '.'

it('Navitem: default', () => {
  const component = renderer.create(<Navitem />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
