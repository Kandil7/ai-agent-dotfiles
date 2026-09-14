---
name: css-styling
description: "CSS and styling patterns. Use when the user says 'Tailwind', 'CSS-in-JS', 'responsive', 'dark mode', 'animation', 'flexbox', 'grid', or 'styled-components'."
---

# CSS & Styling

## Tailwind CSS (recommended)

```tsx
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <img className="w-12 h-12 rounded-full" src={avatar} />
  <div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-sm text-gray-500">{email}</p>
  </div>
</div>
```

### Responsive
- Mobile-first: `sm:`, `md:`, `lg:`, `xl:`
- Example: `w-full md:w-1/2 lg:w-1/3`

### Dark mode
- `dark:` prefix: `bg-white dark:bg-gray-900`
- Toggle: `document.documentElement.classList.toggle('dark')`

## CSS Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

## Flexbox

```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## CSS-in-JS (styled-components)

```tsx
const Card = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${props => props.theme.surface};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;
```

## Animations

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

## Pitfalls

- Not using CSS variables for theming (hard to change later)
- Overusing !important (specificity issues)
- Not testing responsive on real devices (not just browser resize)
- Ignoring accessibility (focus states, contrast ratios)
