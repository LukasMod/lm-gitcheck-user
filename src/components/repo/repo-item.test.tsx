import React from 'react'
import { RepoItem } from './repo-item'
import { IRepo } from '../../types'
import { renderWith } from '../../utils/renderWith'
import { fireEvent } from '@testing-library/react-native'

const mockOnPress = jest.fn()

describe('repo-item', () => {
  const mockItem: IRepo = {
    id: 123,
    name: 'testName',
  } as IRepo

  it('renders correct with repo item', () => {
    const mockItem: IRepo = {
      name: 'testName',
      description: 'testDescription',
    } as IRepo

    const { getByText } = renderWith(<RepoItem item={mockItem} onPressItem={mockOnPress} />)
    getByText(mockItem.name)
    getByText(mockItem.description)
  })

  it('renders correct with missing description', () => {
    const { getByText } = renderWith(<RepoItem item={mockItem} onPressItem={mockOnPress} />)
    getByText(mockItem.name)
  })

  it('calls function after press with correct id param', () => {
    const { getByTestId } = renderWith(<RepoItem item={mockItem} onPressItem={mockOnPress} />)
    const element = getByTestId('containerTestId')
    fireEvent.press(element)
    expect(mockOnPress.mock.calls.length).toBe(1)
    expect(mockOnPress).toHaveBeenCalledWith(123)
  })
})
