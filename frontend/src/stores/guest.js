import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/axios'

export const useGuestStore = defineStore('guest', () => {
  const conversationId = ref(localStorage.getItem('conversation_id') || null)
  const guest = ref(JSON.parse(localStorage.getItem('guest_info') || 'null'))
  const house = ref(JSON.parse(localStorage.getItem('house_info') || 'null'))

  function setSession(data) {
    conversationId.value = data.conversation_id
    guest.value = data.guest
    house.value = data.house
    localStorage.setItem('conversation_id', data.conversation_id)
    localStorage.setItem('guest_info', JSON.stringify(data.guest))
    localStorage.setItem('house_info', JSON.stringify(data.house))
  }

  function clearSession() {
    conversationId.value = null
    guest.value = null
    house.value = null
    localStorage.removeItem('conversation_id')
    localStorage.removeItem('guest_info')
    localStorage.removeItem('house_info')
  }

  return { conversationId, guest, house, setSession, clearSession }
})
