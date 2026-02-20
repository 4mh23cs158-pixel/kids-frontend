const HERO_NAMES = ['Avery', 'Riley', 'Jordan', 'Quinn', 'Skyler', 'River', 'Nova', 'Phoenix', 'Sage', 'Rowan', 'Kai', 'Ember', 'Aspen', 'Finley', 'Wren'];
const THEMES = [
    'Space Adventure',
    'Magical Forest',
    'Underwater Kingdom',
    'Dinosaur Island',
    'Superpower School',
    'Robot City',
    'Time Travel Quest',
    'Talking Animals Garden',
    'Secret Ice Kingdom',
    'Dragon Flying School',
    'Pirate Treasure Hunt',
    'Fairy Tale Land'
];
const MORALS = [
    'Kindness is magic',
    'Teamwork makes the dream work',
    'Honesty is the best policy',
    'Believe in yourself',
    'Sharing is caring',
    'Patience is a virtue',
    'Courage to be different',
    'Never give up',
    'Respect nature',
    'Curiosity leads to discovery'
];
const AGES = ['4', '8', '14'];
const LANGUAGES = [
    'English', 'Spanish', 'French', 'Hindi', 'German', 'Portuguese',
    'Italian', 'Japanese', 'Korean', 'Chinese', 'Arabic', 'Russian',
    'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Urdu'
];

export const getRandomStoryData = () => {
    return {
        name: HERO_NAMES[Math.floor(Math.random() * HERO_NAMES.length)],
        theme: THEMES[Math.floor(Math.random() * THEMES.length)],
        moral: MORALS[Math.floor(Math.random() * MORALS.length)],
        age: AGES[Math.floor(Math.random() * AGES.length)],
        language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)]
    };
};
