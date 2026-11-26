# 🍺 Beer Time!

A countdown to beer time: Friday 15:00 Norway time by default. A glass fills up as the week goes by, and when beer time arrives (until Sunday 23:59) the foam spills over and the confetti starts.

## Features

- ⏰ Live countdown to beer time (Norway time, whatever your own timezone is)
- 🍺 A glass that fills from Monday 00:00 to beer time
- 🎉 Party mode with confetti from beer time until Sunday 23:59
- ⚙️ Settings panel (cog, top right) to pick the day, time, theme and name
- 🎨 Each theme has its own palette and object: a pint, a wine glass, a pizza, a record...
- ♿ Respects reduced motion; screen readers get a calm once-a-minute update
- 📱 Responsive from small phones to large screens

## URL Parameters

The settings panel writes these for you, or set them by hand:

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `name` | The name of your event | Beer | `?name=Wine` |
| `variation` | Theme | beer | `?variation=wine` |
| `day` | Day of your beer time (`mon` to `sun`) | fri | `?day=thu` |
| `time` | Time of your beer time, 24h, Norway time | 15:00 | `?time=16:30` |
| `party` | Force party mode (for previewing) | | `?party=true` |

### Available Variations

- `beer` - 🍺 pint glass (default)
- `wine` - 🍷 wine glass
- `champagne` - 🍾 flute
- `cocktail` - 🍹 martini glass
- `party` - 🎉 balloon
- `coffee` - ☕ mug
- `pizza` - 🍕 pizza, slice by slice
- `gaming` - 🎮 pixel heart
- `music` - 🎵 vinyl record

### Examples

- Wine Time: `?name=Wine&variation=wine`
- Thursday beers: `?day=thu&time=16:30`
- Pizza Friday: `?name=Pizza&variation=pizza`
- Custom Party: `?name=Custom Party&variation=party`

## Preview locally

```sh
python3 -m http.server
```

Then open http://localhost:8000 (add `?party=true` to see party mode).

## Interaction

- **Click anywhere** during party mode for extra confetti!
- **Press any key** during party mode for more celebrations!

## Tech Stack

- Pure HTML, CSS, JavaScript
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for confetti effects
- Google Fonts (Shrikhand, Bricolage Grotesque)
- Cog icon from [Lucide](https://lucide.dev) (ISC)

## License

MIT - Have fun! 🎉

