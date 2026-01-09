# 🍺 Beer Time!

A fun countdown website to Friday 15:00 Norway time! When the weekend arrives (Friday 15:00 - Sunday 23:59), celebrate with spinning emojis and confetti explosions!

## Features

- ⏰ Live countdown to Friday 15:00 (Norway time)
- 🎉 Party mode with confetti explosions on weekends
- 🍺 Spinning emoji animations
- 🎨 Beautiful, energetic UI with gradient animations
- 🔧 Customizable via URL parameters
- 📱 Fully responsive

## URL Parameters

Customize your experience with URL parameters:

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `name` | The name of your event | Beer | `?name=Wine` |
| `variation` | Emoji theme | beer | `?variation=wine` |

### Available Variations

- `beer` - 🍺 (default)
- `wine` - 🍷
- `champagne` - 🍾
- `cocktail` - 🍹
- `party` - 🎉
- `coffee` - ☕
- `pizza` - 🍕
- `gaming` - 🎮
- `music` - 🎵

### Examples

- Wine Time: `?name=Wine&variation=wine`
- Pizza Friday: `?name=Pizza&variation=pizza`
- Gaming Time: `?name=Gaming&variation=gaming`
- Custom Party: `?name=Custom Party&variation=party`

## Deployment

### Option 1: Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or simply:
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy with one click

### Option 2: Netlify (Free)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

Or drag & drop your folder at [netlify.com/drop](https://app.netlify.com/drop)

### Option 3: GitHub Pages (Free)

1. Push to GitHub
2. Go to Settings → Pages
3. Select source branch
4. Your site is live!

### Option 4: Local Development

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

## Interaction

- **Click anywhere** during party mode for extra confetti!
- **Press any key** during party mode for more celebrations!

## Tech Stack

- Pure HTML, CSS, JavaScript
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for confetti effects
- Google Fonts (Bangers, Fredoka)

## License

MIT - Have fun! 🎉

