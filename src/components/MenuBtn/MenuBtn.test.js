import React from 'react'
import renderer from 'react-test-renderer'
import Menubtn from '.'

it('Menubtn: default', () => {
  const component = renderer.create(<Menubtn />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
