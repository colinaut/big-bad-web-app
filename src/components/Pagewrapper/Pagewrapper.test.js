import React from 'react'
import renderer from 'react-test-renderer'
import Pagewrapper from '.'

it('Pagewrapper: default', () => {
  const component = renderer.create(<Pagewrapper />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
