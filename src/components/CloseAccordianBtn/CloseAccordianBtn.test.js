import React from 'react'
import renderer from 'react-test-renderer'
import CloseAccordianBtn from '.'

it('CloseAccordianBtn: default', () => {
  const component = renderer.create(<CloseAccordianBtn />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
