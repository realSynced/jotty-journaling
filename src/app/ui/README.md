# UI Color Scheme Documentation

## Color Palette

This color palette features a natural, earthy collection of colors that transition from soft greens to warm beiges and browns:

| Color          | Hex Code  | Description                                                        |
| -------------- | --------- | ------------------------------------------------------------------ |
| 🍃 Sage        | `#CCD5AE` | Light olive-green, suitable for accents and subtle backgrounds     |
| 🌱 Pale Spring | `#E9EDC9` | Very light yellow-green, perfect for secondary backgrounds         |
| 🍦 Cream       | `#FEFAE0` | Soft off-white, ideal for primary backgrounds and content areas    |
| 🍯 Honey       | `#FAEDCD` | Warm beige, good for highlights and containers                     |
| 🪵 Caramel     | `#D4A373` | Medium brown, works well for primary buttons and emphasis elements |

## Usage Guidelines

- Use `#FEFAE0` (Cream) as the primary background color for most content areas
- Use `#CCD5AE` (Sage) and `#E9EDC9` (Pale Spring) for section dividers, headers, and secondary elements
- Use `#D4A373` (Caramel) for calls-to-action, buttons, and important highlights
- Use `#FAEDCD` (Honey) for hover states, cards, and subtle emphasis

## Implementation

These colors can be configured in Tailwind CSS by adding them to your `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        jotty: {
          sage: "#CCD5AE",
          spring: "#E9EDC9",
          cream: "#FEFAE0",
          honey: "#FAEDCD",
          caramel: "#D4A373",
        },
      },
    },
  },
};
```

Original palette source: https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373
