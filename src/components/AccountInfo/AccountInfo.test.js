import React from 'react'
import renderer from 'react-test-renderer'
import AccountInfo from '.'

it('AccountInfo: default', () => {
  const component = renderer.create(<AccountInfo />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
