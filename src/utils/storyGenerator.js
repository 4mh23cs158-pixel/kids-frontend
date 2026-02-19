import api from './api';

// 🔮 Generate ONLY story (optional if needed separately)
export const generateStory = async (data) => {
    const response = await api.post('/story/generate-story', data);
    return response.data;
};


// 🎨 Generate Story + Comic Together (MAIN FUNCTION)
export const generateComic = async (data) => {
    // data: { name, age, theme, moral, language }

    const response = await api.post('/story/generate-comic', data);

    return response.data; 
    // expected:
    // {
    //   story: "...",
    //   panels: [
    //      { text: "...", image_url: "..." }
    //   ]
    // }
};


// 📸 Upload photo (if you still need it)
export const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/story/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};


// 🔐 Authentication
export const login = async (identifier, password) => {
    const response = await api.post('/auth/login', { identifier, password });

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

export const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
