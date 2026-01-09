// Variation configurations with emojis
const variations = {
    beer: {
        emoji: '🍺',
        confettiEmoji: ['🍺', '🍻', '🎉'],
    },
    wine: {
        emoji: '🍷',
        confettiEmoji: ['🍷', '🍇', '✨'],
    },
    champagne: {
        emoji: '🍾',
        confettiEmoji: ['🍾', '🥂', '✨', '🎊'],
    },
    cocktail: {
        emoji: '🍹',
        confettiEmoji: ['🍹', '🍸', '🌴', '🎉'],
    },
    party: {
        emoji: '🎉',
        confettiEmoji: ['🎉', '🎊', '🥳', '🎈', '🪩'],
    },
    coffee: {
        emoji: '☕',
        confettiEmoji: ['☕', '🫖', '🍪'],
    },
    pizza: {
        emoji: '🍕',
        confettiEmoji: ['🍕', '🧀', '🍝', '🎉'],
    },
    gaming: {
        emoji: '🎮',
        confettiEmoji: ['🎮', '🕹️', '👾', '🏆'],
    },
    music: {
        emoji: '🎵',
        confettiEmoji: ['🎵', '🎶', '🎤', '🎸', '🎧'],
    },
};

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const customName = urlParams.get('name') || 'Beer';
const variationType = urlParams.get('variation') || 'beer';

// Get variation config (fallback to beer if not found)
const variation = variations[variationType.toLowerCase()] || variations.beer;

// Update page elements with custom values
document.title = `${customName} Time! ${variation.emoji}`;
document.getElementById('title-text').textContent = `${customName} Time`;
document.getElementById('emoji-left').textContent = variation.emoji;
document.getElementById('emoji-right').textContent = variation.emoji;
document.getElementById('party-title').textContent = `It's ${customName} Time!`;

// Update spinning emojis
const spinningEmojis = document.getElementById('spinning-emojis');
spinningEmojis.innerHTML = Array(5)
    .fill(null)
    .map(() => `<span class="spin-emoji">${variation.emoji}</span>`)
    .join('');

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
    return { weekday, hour, minute };
}

// Get next Friday 15:00 Norway time as a Date
function getNextFriday1500() {
    const { weekday, hour, minute } = getNorwayNow();
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const today = days[weekday];
    
    let daysToFriday = (5 - today + 7) % 7;
    if (daysToFriday === 0 && (hour > 15 || (hour === 15 && minute >= 0))) {
        daysToFriday = 7;
    }
    
    // Build target date string in Norway timezone, then parse it
    const now = new Date();
    now.setDate(now.getDate() + daysToFriday);
    
    const dateStr = new Intl.DateTimeFormat('sv-SE', {
        timeZone: NORWAY_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now);
    
    // Parse as Norway time: "YYYY-MM-DD 15:00" in Europe/Oslo
    // Use a trick: create date, get its UTC offset for Norway, adjust
    const [y, m, d] = dateStr.split('-').map(Number);
    
    // Friday 15:00 Norway = 14:00 UTC (winter) or 13:00 UTC (summer)
    // Get the offset dynamically
    const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    const utcStr = probe.toISOString();
    const norwayStr = probe.toLocaleString('sv-SE', { timeZone: NORWAY_TZ });
    const norwayHour = parseInt(norwayStr.split(' ')[1].split(':')[0]);
    const offset = norwayHour - 12; // Hours ahead of UTC
    
    // Target: 15:00 Norway = (15 - offset):00 UTC
    return new Date(Date.UTC(y, m - 1, d, 15 - offset, 0, 0));
}

// Check if it's party time (Friday 15:00 to Sunday 23:59)
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
    const hour = parseInt(getPart('hour'));
    
    // Party time: Friday 15:00+, all Saturday, all Sunday
    if (day === 'Sat' || day === 'Sun') {
        return true;
    }
    if (day === 'Fri' && hour >= 15) {
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

// Update the countdown display
function updateCountdown() {
    const countdownMode = document.getElementById('countdown-mode');
    const partyMode = document.getElementById('party-mode');
    
    if (isPartyTime()) {
        countdownMode.classList.add('hidden');
        partyMode.classList.remove('hidden');
        return true; // Party mode active
    }
    
    countdownMode.classList.remove('hidden');
    partyMode.classList.add('hidden');
    
    const target = getNextFriday1500();
    const { days, hours, minutes, seconds } = getTimeDiff(target);
    
    document.getElementById('days').textContent = pad(days);
    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
    
    return false; // Countdown mode active
}

// Confetti explosion functions
function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
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
        colors: ['#ff6b35', '#ffc300', '#ff006e', '#8338ec', '#3a86ff'],
    });

    fire(0.2, {
        spread: 60,
        colors: ['#ff6b35', '#ffc300', '#ff006e'],
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ffc300', '#ff006e', '#8338ec'],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#ff6b35', '#3a86ff'],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#ffc300', '#ff006e', '#8338ec', '#3a86ff'],
    });
}

// Emoji confetti
function fireEmojiConfetti() {
    const emojis = variation.confettiEmoji;
    
    confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.6 },
        shapes: ['circle'],
        scalar: 2,
        colors: ['#ff6b35', '#ffc300', '#ff006e', '#8338ec'],
        zIndex: 1000,
    });
    
    // Fire from left
    confetti({
        particleCount: 20,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff6b35', '#ffc300', '#ff006e'],
        zIndex: 1000,
    });
    
    // Fire from right
    confetti({
        particleCount: 20,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#8338ec', '#3a86ff', '#ffc300'],
        zIndex: 1000,
    });
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
document.addEventListener('click', () => {
    if (isPartyTime()) {
        fireConfetti();
    }
});

// Keyboard shortcut for confetti (any key during party mode)
document.addEventListener('keydown', (e) => {
    if (isPartyTime() && e.key !== 'Tab') {
        fireConfetti();
    }
});

