import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type HomeStackNavigatorParamList = {
  Home: undefined
  Details: { repoId: number }
}

export type HomeScreenNavProp = NativeStackNavigationProp<HomeStackNavigatorParamList, 'Home'>
export type DetailsScreenNavProp = NativeStackNavigationProp<HomeStackNavigatorParamList, 'Details'>
export type DetailsScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'Details'>
