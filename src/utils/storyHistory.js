// 📚 Story History — localStorage-based persistence per user

const STORAGE_KEY = 'story_magic_history'

const getStorageKey = () => {
    const token = localStorage.getItem('token')
    // Use a hash of the token to namespace stories per user
    return token ? `${STORAGE_KEY}_${btoa(token).slice(0, 12)}` : STORAGE_KEY
}

export const saveStory = (storyData) => {
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
    stories.unshift(entry) // newest first
    localStorage.setItem(getStorageKey(), JSON.stringify(stories))
    return entry
}

export const getStories = () => {
    try {
        const raw = localStorage.getItem(getStorageKey())
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const deleteStory = (id) => {
    const stories = getStories().filter(s => s.id !== id)
    localStorage.setItem(getStorageKey(), JSON.stringify(stories))
}

export const clearStories = () => {
    localStorage.removeItem(getStorageKey())
}
