<template>
  <v-app>
    <v-main :style="{ background: '#F0F4F8', minHeight: '100vh' }">
      <!-- Header -->
      <div :style="{ background: primaryColor }" class="chat-header px-4 py-3 d-flex align-center">
        <v-icon color="white" class="mr-2">mdi-robot-excited</v-icon>
        <div class="flex-grow-1">
          <div class="text-white font-weight-bold text-body-1">{{ guestStore.house?.name }}</div>
          <div class="text-white text-caption" style="opacity:0.8">AI Konsyerj</div>
        </div>
        <v-avatar size="36" :color="primaryColor" style="border:2px solid rgba(255,255,255,0.4)">
          <span class="text-white font-weight-bold">{{ initials }}</span>
        </v-avatar>
      </div>

      <!-- Messages -->
      <div ref="messagesEl" class="messages-container px-3 py-3" style="padding-bottom: 140px">
        <template v-for="msg in messages" :key="msg.id">
          <!-- AI message -->
          <div v-if="msg.role === 'assistant'" class="d-flex align-start mb-3">
            <v-avatar size="32" :color="primaryColor" class="mr-2 mt-1">
              <v-icon color="white" size="18">mdi-robot</v-icon>
            </v-avatar>
            <div class="ai-bubble pa-3">
              <div class="text-body-2" style="white-space: pre-line">{{ msg.content }}</div>
              <div class="text-caption text-medium-emphasis mt-1">{{ formatTime(msg.created_at) }}</div>
            </div>
          </div>

          <!-- User message -->
          <div v-else-if="msg.role === 'user'" class="d-flex justify-end mb-3">
            <div class="user-bubble pa-3" :style="{ background: primaryColor }">
              <div class="text-white text-body-2" style="white-space: pre-line">{{ msg.content }}</div>
              <div class="text-caption mt-1" style="opacity:0.7; color:#fff">{{ formatTime(msg.created_at) }}</div>
            </div>
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="typing" class="d-flex align-start mb-3">
          <v-avatar size="32" :color="primaryColor" class="mr-2 mt-1">
            <v-icon color="white" size="18">mdi-robot</v-icon>
          </v-avatar>
          <div class="ai-bubble pa-3">
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick chips -->
      <div class="quick-chips-bar px-3 py-2">
        <v-chip
          v-for="chip in quickChips"
          :key="chip.text"
          @click="sendMessage(chip.text)"
          size="small"
          class="mr-2 mb-1"
          :color="primaryColor"
          variant="tonal"
          rounded="lg"
          prepend-icon=""
        >
          {{ chip.icon }} {{ chip.text }}
        </v-chip>
      </div>

      <!-- Input bar -->
      <div class="input-bar px-3 py-2">
        <v-card elevation="3" rounded="xl" class="d-flex align-center px-3 py-1">
          <v-textarea
            v-model="input"
            @keydown.enter.exact.prevent="sendMessage()"
            placeholder="Yozing..."
            rows="1"
            auto-grow
            max-rows="3"
            variant="plain"
            hide-details
            density="compact"
            class="flex-grow-1"
          />
          <v-btn
            @click="sendMessage()"
            :loading="sending"
            :disabled="!input.trim()"
            icon
            :color="primaryColor"
            size="small"
            class="ml-2"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import { useGuestStore } from '@/stores/guest'

const router = useRouter()
const guestStore = useGuestStore()

const messages = ref([])
const input = ref('')
const sending = ref(false)
const typing = ref(false)
const messagesEl = ref(null)

const primaryColor = computed(() => guestStore.house?.primary_color || '#0D1B2A')
const initials = computed(() => {
  const name = guestStore.guest?.name || 'G'
  return name.charAt(0).toUpperCase()
})

const quickChips = [
  { icon: '🚕', text: 'Transfer bron qilish' },
  { icon: '📋', text: 'Qoidalar' },
  { icon: '📝', text: "So'rov yuborish" },
  { icon: '📍', text: "Atrofdagi joylar" },
  { icon: '📶', text: 'Wi-Fi paroli' },
]

onMounted(async () => {
  if (!guestStore.conversationId) {
    router.replace('/')
    return
  }
  await loadMessages()
})

async function loadMessages() {
  try {
    const { data } = await api.get(`/public/chat/${guestStore.conversationId}/messages`)
    messages.value = data
    await scrollBottom()

    // If no messages, show welcome
    if (messages.value.length === 0) {
      messages.value.push({
        id: 0,
        role: 'assistant',
        content: `Assalomu alaykum, ${guestStore.guest?.name}! 👋\n\nMen ${guestStore.house?.name} mehmon uyining AI konsyerjiman. Sizga qanday yordam bera olaman?\n\nQuyidagi tugmalardan birini tanlang yoki o'z savolingizni yozing.`,
        created_at: new Date().toISOString(),
      })
    }
  } catch (err) {
    console.error(err)
  }
}

async function sendMessage(text) {
  const content = text || input.value.trim()
  if (!content || sending.value) return

  input.value = ''
  sending.value = true
  typing.value = true

  // Add user message locally
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content,
    created_at: new Date().toISOString(),
  })
  await scrollBottom()

  try {
    const { data } = await api.post('/public/chat', {
      conversation_id: guestStore.conversationId,
      message: content,
    })

    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: data.message,
      created_at: new Date().toISOString(),
    })
  } catch {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: 'Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',
      created_at: new Date().toISOString(),
    })
  } finally {
    sending.value = false
    typing.value = false
    await scrollBottom()
  }
}

async function scrollBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

function formatTime(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString('uz', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.chat-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.messages-container { margin-top: 64px; overflow-y: auto; min-height: calc(100vh - 64px); }
.ai-bubble {
  background: #fff;
  border-radius: 4px 18px 18px 18px;
  max-width: 78vw;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.user-bubble {
  border-radius: 18px 4px 18px 18px;
  max-width: 78vw;
}
.quick-chips-bar {
  position: fixed;
  bottom: 72px;
  left: 0;
  right: 0;
  background: rgba(240,244,248,0.95);
  backdrop-filter: blur(8px);
  z-index: 99;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
}
.input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(240,244,248,0.95);
  backdrop-filter: blur(8px);
  z-index: 100;
}
.typing-dots { display: flex; gap: 4px; padding: 4px; }
.typing-dots span {
  width: 8px; height: 8px; border-radius: 50%;
  background: #94A3B8;
  animation: bounce 1.2s infinite;
}
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}
</style>
