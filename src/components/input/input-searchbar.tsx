import * as React from 'react'
import { ImageStyle, TouchableOpacity, ViewStyle, TextInput, TextStyle } from 'react-native'
import { color, rounding, tpRegularTextL } from '../../theme'
import { metrics } from '../../utils'
import { Icon } from '../icon/icon'
import { Icons } from '../icon/icons'
import { observer } from 'mobx-react-lite'

export interface IInputSearchBar {
  setText: (text: string) => void
  text: string
  placeholder: string
  isError?: boolean
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  height: 51,
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 12,
  flexDirection: 'row',
  borderRadius: rounding.small,
  borderColor: color.primary,
  borderWidth: 2,
}
const CONTAINER_ERROR: ViewStyle = {
  borderColor: color.error,
}
const ICON: ImageStyle = {
  tintColor: color.palette.gray,
}
const TEXT: TextStyle = {
  ...tpRegularTextL,
  paddingHorizontal: 10,
  flex: 1,
  lineHeight: 20,
}

export const InputSearchbar = observer(
  ({ setText, text, placeholder, isError }: IInputSearchBar) => {
    const inputRef = React.useRef<TextInput>()

    const onPressSearchbar = () => {
      inputRef?.current?.focus()
    }

    const onPressCancel = () => {
      setText('')
      inputRef?.current?.blur()
    }

    return (
      <TouchableOpacity
        style={[CONTAINER, isError && CONTAINER_ERROR]}
        activeOpacity={metrics.activeOpacity}
        onPress={onPressSearchbar}>
        <Icon style={ICON} icon={Icons.SEARCH} size={15} />
        <TextInput
          style={TEXT}
          ref={inputRef}
          onChangeText={setText}
          value={text}
          selectionColor={color.primary}
          placeholder={placeholder}
        />
        {!!text.length && (
          <Icon
            style={ICON}
            icon={Icons.CANCEL}
            size={17}
            onPress={onPressCancel}
            hitSlop={metrics.hitSlop}
          />
        )}
      </TouchableOpacity>
    )
  }
)
