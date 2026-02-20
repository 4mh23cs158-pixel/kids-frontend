// 📚 Story History — isolated storage for Guests (Session) and Users (Local)

const GUEST_KEY = 'story_magic_guest_history'
const USER_BASE_KEY = 'story_magic_user_history'

const getAuthToken = () => localStorage.getItem('token')

const getStorageConfig = () => {
    const token = getAuthToken()
    if (token) {
        // Logged-in: Persistent localStorage
        const userId = btoa(token).slice(0, 12)
        return {
            storage: localStorage,
            key: `${USER_BASE_KEY}_${userId}`
        }
    } else {
        // Guest: Temporary sessionStorage
        return {
            storage: sessionStorage,
            key: GUEST_KEY
        }
    }
}

export const saveStory = (storyData) => {
    const { storage, key } = getStorageConfig()
    const stories = getStories()

    const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: storyData.name,
        age: storyData.age,
        theme: storyData.theme,
        moral: storyData.moral,
        language: storyData.language,
        story: storyData.story,
        panels: storyData.panels || [],
        createdAt: new Date().toISOString(),
    }

    stories.unshift(entry)
    storage.setItem(key, JSON.stringify(stories))
    return entry
}

export const getStories = () => {
    const { storage, key } = getStorageConfig()
    try {
        const raw = storage.getItem(key)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const deleteStory = (id) => {
    const { storage, key } = getStorageConfig()
    const stories = getStories().filter(s => s.id !== id)
    storage.setItem(key, JSON.stringify(stories))
}

export const clearStories = () => {
    const { storage, key } = getStorageConfig()
    storage.removeItem(key)
}
