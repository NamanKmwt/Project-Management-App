import { create } from 'zustand'
import {persist} from 'zustand/middleware'

export const useMemberStore = create(
  persist(

    (set) => ({
      membersArray : [], 
      addMembers : (value: any)=> set(()=>({membersArray : value}))
    }) , {
      name : "usermemberStorage"
    }
  )

)

export const useAllMemberStore = create(
  persist(
  (set) => ({
  AllmembersArray : [], 
  addAllMembers : (value: any)=> set(()=>({AllmembersArray : value}))
}), {
  name : 'useAllmemberStorage'
}
  )
)