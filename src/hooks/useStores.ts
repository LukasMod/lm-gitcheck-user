import React from 'react'
import RootStore from '../stores/root-store'

export const rootStore = new RootStore()
export const storesContext = React.createContext(rootStore)
export const useStores = () => React.useContext(storesContext)
