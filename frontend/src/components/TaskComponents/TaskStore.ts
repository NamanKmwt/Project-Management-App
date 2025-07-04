import { create } from 'zustand'

export const useMemberStore = create((set) => ({
  membersArray : [], 
  addMembers : (value: any)=> set(()=>({membersArray : value}))
}))

export const useAllMemberStore = create((set) => ({
  AllmembersArray : [], 
  addAllMembers : (value: any)=> set(()=>({AllmembersArray : value}))
}))