import { create } from 'zustand'

export const useSelectedStore = create((set) => ({
  selected : 'Dashboard', 
  setSelected : (value: string)=> set(() => ({selected : value}))
}))

export const useSelectedStoreTask = create((set) => ({
  selectedTask : 'Dashboard',
  setSelectedTask : (value: string)=> set(() => ({selectedTask : value}))
}))

export const useUserSelectedStore = create((set) => ({
 userSelected : 'Dashboard',
setUserSelected : (value: string)=> set(() => ({userSelected : value}))
}))

