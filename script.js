// Variation configurations: the main object (`vessel`, shaped in style.css), its progress line,
// the page palette (the vessel fills with `liquid`) and emojis
const variations = {
    beer: {
        vessel: 'pint',
        progress: 'The glass is {n}% full.',
        theme: { bg: '#12392B', bgDeep: '#0A261C', liquid: '#F2A230', liquidDeep: '#C9701A', foam: '#FFF3D6' },
        emoji: '🍺',
        confettiEmoji: ['🍺', '🍻', '🎉'],
    },
    wine: {
        vessel: 'wine',
        progress: 'The glass is {n}% full.',
        theme: { bg: '#3A1024', bgDeep: '#22091A', liquid: '#A3213F', liquidDeep: '#5C0F25', foam: '#F7DCE3' },
        emoji: '🍷',
        confettiEmoji: ['🍷', '🍇', '✨'],
    },
    champagne: {
        vessel: 'flute',
        progress: 'The flute is {n}% full.',
        theme: { bg: '#152A4A', bgDeep: '#0B1830', liquid: '#F3DE8A', liquidDeep: '#D9B65A', foam: '#FFFBEA' },
        emoji: '🍾',
        confettiEmoji: ['🍾', '🥂', '✨', '🎊'],
    },
    cocktail: {
        vessel: 'martini',
        progress: 'The glass is {n}% full.',
        theme: { bg: '#0E4A4F', bgDeep: '#072C30', liquid: '#FF7A59', liquidDeep: '#E0435C', foam: '#FFE9DC' },
        emoji: '🍹',
        confettiEmoji: ['🍹', '🍸', '🌴', '🎉'],
    },
    party: {
        vessel: 'balloon',
        progress: 'The balloon is {n}% full.',
        theme: { bg: '#2A1458', bgDeep: '#170A35', liquid: '#FF4FA3', liquidDeep: '#C21E7A', foam: '#FFE6F3' },
        emoji: '🎉',
        confettiEmoji: ['🎉', '🎊', '🥳', '🎈', '🪩'],
    },
    coffee: {
        vessel: 'mug',
        progress: 'The mug is {n}% full.',
        theme: { bg: '#2B1A12', bgDeep: '#170D08', liquid: '#7A4A2A', liquidDeep: '#3E2414', foam: '#F0D6B0' },
        emoji: '☕',
        confettiEmoji: ['☕', '🫖', '🍪'],
    },
    pizza: {
        vessel: 'pizza',
        progress: 'The pizza is {n}% done.',
        theme: { bg: '#1F3B1F', bgDeep: '#102410', liquid: '#E8452C', liquidDeep: '#B02A18', foam: '#FFE7A3' },
        emoji: '🍕',
        confettiEmoji: ['🍕', '🧀', '🍝', '🎉'],
    },
    gaming: {
        vessel: 'heart',
        progress: 'Health: {n}%.',
        theme: { bg: '#101A3A', bgDeep: '#080E24', liquid: '#5BE37D', liquidDeep: '#1F9E4A', foam: '#E3FFEA' },
        emoji: '🎮',
        confettiEmoji: ['🎮', '🕹️', '👾', '🏆'],
    },
    music: {
        vessel: 'record',
        progress: 'The record is {n}% played.',
        theme: { bg: '#241046', bgDeep: '#13072A', liquid: '#FFB020', liquidDeep: '#E06A00', foam: '#FFF1CF' },
        emoji: '🎵',
        confettiEmoji: ['🎵', '🎶', '🎤', '🎸', '🎧'],
    },
};

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const customName = urlParams.get('name') || 'Beer';
const variationType = urlParams.get('variation') || 'beer';

// Beer time: ?day=thu&time=16:30 (defaults Friday 15:00). Invalid values fall back to the defaults.
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayParam = DAY_KEYS.indexOf((urlParams.get('day') || '').slice(0, 3).toLowerCase());
const BEER_DAY = dayParam === -1 ? 5 : dayParam; // 0 = Sunday, like Date#getDay
const timeMatch = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(urlParams.get('time') || '');
const BEER_HOUR = timeMatch ? Number(timeMatch[1]) : 15;
const BEER_MINUTE = timeMatch ? Number(timeMatch[2]) : 0;
const beerTimeLabel = `${DAY_NAMES[BEER_DAY]} ${pad(BEER_HOUR)}:${pad(BEER_MINUTE)}`;

// Get variation config (fallback to beer if not found)
const variation = variations[variationType.toLowerCase()] || variations.beer;

// Update page elements with custom values
document.title = `${customName} Time! ${variation.emoji}`;
document.getElementById('title-text').textContent = `${customName} Time`;
document.getElementById('party-title').textContent = `It's ${customName} Time!`;
document.getElementById('beer-time-label').textContent = beerTimeLabel;

// Settings panel: pre-fill from the URL, submit back as URL parameters
const settingsForm = document.getElementById('settings-form');
settingsForm.variation.innerHTML = Object.entries(variations)
    .map(([key, v]) => `<option value="${key}">${v.emoji} ${key[0].toUpperCase()}${key.slice(1)}</option>`)
    .join('');
settingsForm.day.value = DAY_KEYS[BEER_DAY];
settingsForm.time.value = `${pad(BEER_HOUR)}:${pad(BEER_MINUTE)}`;
settingsForm.variation.value = variations[variationType.toLowerCase()] ? variationType.toLowerCase() : 'beer';
settingsForm.elements.name.value = urlParams.get('name') || '';
// Keep the URL short: drop empty fields and the defaults
settingsForm.addEventListener('formdata', (e) => {
    const defaults = { day: 'fri', time: '15:00', variation: 'beer', name: '' };
    for (const [key, value] of [...e.formData]) {
        if (value.trim() === defaults[key]) e.formData.delete(key);
    }
});
document.getElementById('glass').dataset.vessel = variation.vessel;

// Apply the variation's palette
const rootStyle = document.documentElement.style;
rootStyle.setProperty('--bg', variation.theme.bg);
rootStyle.setProperty('--bg-deep', variation.theme.bgDeep);
rootStyle.setProperty('--liquid', variation.theme.liquid);
rootStyle.setProperty('--liquid-deep', variation.theme.liquidDeep);
rootStyle.setProperty('--foam', variation.theme.foam);
document.querySelector('meta[name="theme-color"]').content = variation.theme.bg;
const themeColors = [variation.theme.liquid, variation.theme.liquidDeep, variation.theme.foam];

// Monday = 1 ... Sunday = 7, so "later in the week" is a plain comparison
function weekIndexOf(day) {
    return day === 0 ? 7 : day;
}

// Norway timezone
const NORWAY_TZ = 'Europe/Oslo';

// Get current day/hour in Norway
function getNorwayNow() {
    const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: NORWAY_TZ,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const str = fmt.format(new Date());
    const [weekday, time] = str.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    return { weekday, hour: hour % 24, minute }; // some engines say "24" at midnight
}

// Get the next beer time (default Friday 15:00) in Norway time as a Date
function getNextBeerTime() {
    const { weekday, hour, minute } = getNorwayNow();
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const today = days[weekday];
    
    let daysToTarget = (BEER_DAY - today + 7) % 7;
    if (daysToTarget === 0 && (hour > BEER_HOUR || (hour === BEER_HOUR && minute >= BEER_MINUTE))) {
        daysToTarget = 7;
    }
    
    // Build target date string in Norway timezone, then parse it
    const now = new Date();
    now.setDate(now.getDate() + daysToTarget);
    
    const dateStr = new Intl.DateTimeFormat('sv-SE', {
        timeZone: NORWAY_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now);
    
    // Parse as Norway time: "YYYY-MM-DD HH:MM" in Europe/Oslo
    // Use a trick: create date, get its UTC offset for Norway, adjust
    const [y, m, d] = dateStr.split('-').map(Number);
    
    // Friday 15:00 Norway = 14:00 UTC (winter) or 13:00 UTC (summer)
    // Get the offset dynamically
    const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    const utcStr = probe.toISOString();
    const norwayStr = probe.toLocaleString('sv-SE', { timeZone: NORWAY_TZ });
    const norwayHour = parseInt(norwayStr.split(' ')[1].split(':')[0]);
    const offset = norwayHour - 12; // Hours ahead of UTC
    
    // Target: HH:MM Norway = (HH - offset):MM UTC
    return new Date(Date.UTC(y, m - 1, d, BEER_HOUR - offset, BEER_MINUTE, 0));
}

// Check if it's party time (beer time, default Friday 15:00, to Sunday 23:59)
function isPartyTime() {
    // Allow forcing party mode via URL param for testing
    if (urlParams.get('party') === 'true') {
        return true;
    }
    
    const now = new Date();
    
    const norwayFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: NORWAY_TZ,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const parts = norwayFormatter.formatToParts(now);
    const getPart = (type) => parts.find(p => p.type === type)?.value;
    
    const day = getPart('weekday');
    const hour = parseInt(getPart('hour')) % 24; // some engines say "24" at midnight
    const minute = parseInt(getPart('minute'));
    
    // Week runs Monday (1) to Sunday (7); party from beer time until the week ends
    const today = weekIndexOf(DAY_KEYS.indexOf(day.toLowerCase()));
    const beerDay = weekIndexOf(BEER_DAY);
    if (today > beerDay) {
        return true;
    }
    if (today === beerDay && (hour > BEER_HOUR || (hour === BEER_HOUR && minute >= BEER_MINUTE))) {
        return true;
    }
    
    return false;
}

// Calculate time difference
function getTimeDiff(target) {
    const now = new Date();
    const diff = target - now;
    
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// Pad numbers with leading zeros
function pad(num) {
    return num.toString().padStart(2, '0');
}

// The countdown runs from Monday 00:00 to beer time (default Friday 15:00: 4 days 15 hours).
// ponytail: fixed span. A DST switch only lands inside it for a Sunday beer time, where the fill is off by an hour.
const WEEK_SPAN_MS = Math.max(1, ((weekIndexOf(BEER_DAY) - 1) * 24 * 60 + BEER_HOUR * 60 + BEER_MINUTE) * 60 * 1000);

let lastSrMinute = null;

function plural(n, word) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
}

// Update the countdown display
function updateCountdown() {
    const countdownMode = document.getElementById('countdown-mode');
    const partyMode = document.getElementById('party-mode');
    
    if (isPartyTime()) {
        countdownMode.classList.add('hidden');
        partyMode.classList.remove('hidden');
        document.body.classList.add('party');
        return true; // Party mode active
    }
    
    countdownMode.classList.remove('hidden');
    partyMode.classList.add('hidden');
    document.body.classList.remove('party');
    
    const target = getNextBeerTime();
    const { days, hours, minutes, seconds } = getTimeDiff(target);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
    
    // Fill the glass as the week goes by
    const fill = Math.min(1, Math.max(0, 1 - (target - new Date()) / WEEK_SPAN_MS));
    rootStyle.setProperty('--fill', fill.toFixed(4));
    document.getElementById('progress-text').textContent =
        variation.progress.replace('{n}', Math.floor(fill * 100));
    
    // Screen readers get a calm update once a minute, not every second
    const srMinute = `${days}:${hours}:${minutes}`;
    if (srMinute !== lastSrMinute) {
        lastSrMinute = srMinute;
        document.getElementById('countdown-sr').textContent =
            `${plural(days, 'day')}, ${plural(hours, 'hour')} and ${plural(minutes, 'minute')} until ${beerTimeLabel}.`;
    }
    
    return false; // Countdown mode active
}

// Confetti explosion functions
function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
        colors: themeColors,
        disableForReducedMotion: true,
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Emoji confetti (uses the variation's emojis where the library supports text shapes)
const emojiShapes = window.confetti?.shapeFromText
    ? variation.confettiEmoji.map(text => confetti.shapeFromText({ text, scalar: 2 }))
    : null;

function fireEmojiConfetti() {
    const shared = { zIndex: 1000, colors: themeColors, disableForReducedMotion: true };
    
    confetti({
        ...shared,
        particleCount: 18,
        spread: 100,
        origin: { y: 0.6 },
        ...(emojiShapes && { shapes: emojiShapes, scalar: 2, flat: true }),
    });
    
    // Fire from left
    confetti({ ...shared, particleCount: 20, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
    
    // Fire from right
    confetti({ ...shared, particleCount: 20, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
}

// Continuous party confetti
let confettiInterval = null;

function startPartyConfetti() {
    // Initial big explosion
    fireConfetti();
    
    // Continuous smaller bursts
    confettiInterval = setInterval(() => {
        fireEmojiConfetti();
    }, 3000);
}

function stopPartyConfetti() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
}

// Main loop
let wasPartyMode = false;

function tick() {
    const isParty = updateCountdown();
    
    // Just entered party mode
    if (isParty && !wasPartyMode) {
        startPartyConfetti();
    }
    
    // Just left party mode
    if (!isParty && wasPartyMode) {
        stopPartyConfetti();
    }
    
    wasPartyMode = isParty;
}

// Initialize
tick();
setInterval(tick, 1000);

// Fire initial confetti if in party mode
if (isPartyTime()) {
    startPartyConfetti();
}

// Add some interaction - click anywhere for extra confetti during party
const inSettings = (e) => e.target.closest('#settings, .settings-toggle');

document.addEventListener('click', (e) => {
    if (isPartyTime() && !inSettings(e)) {
        fireConfetti();
    }
});

// Keyboard shortcut for confetti (any key during party mode)
document.addEventListener('keydown', (e) => {
    if (isPartyTime() && e.key !== 'Tab' && !inSettings(e)) {
        fireConfetti();
    }
});

