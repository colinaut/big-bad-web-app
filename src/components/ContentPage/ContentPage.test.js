import React from 'react'
import renderer from 'react-test-renderer'
import ContentPage from '.'

it('ContentPage: default', () => {
  const component = renderer.create(<ContentPage />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
