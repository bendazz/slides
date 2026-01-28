# Neural Networks: Slides & Practice

This is a simple front-end web app to teach basic feed-forward neural networks with slides and practice problems.

## Quick Start

Open a local server from the project root and visit it in your browser:

```bash
python3 -m http.server 8000
```

Then navigate to:

- http://localhost:8000

The app entry point is in [index.html](index.html). Styles and scripts live under [assets/css/styles.css](assets/css/styles.css) and [assets/js/app.js](assets/js/app.js).

### Math Rendering (KaTeX)

You can include math in slides and practice using LaTeX delimiters:

- Inline: `\( ... \)`
- Display: `\[ ... \]` or `$$ ... $$`

Examples:

- `\( f(x) = ax + b \)`
- `\( \hat{Y} = wX + b \)`

## Next Steps

- Expand slide content (neurons, layers, activations, loss).
- Add more practice problems and explanations.
- Optional: include math rendering (KaTeX) and small interactive demos.