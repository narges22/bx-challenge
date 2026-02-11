# Development Notes

## Custom Hook for Data Fetching

- **useChartData**: Custom hook that handles fetching chart data, loading, and error handling.

## Chart Canvas Implementation

### Data Structure

- Chart data contains an array of lines
- Each line contains an array of point objects

### Algorithm for Rendering the Chart

1. **Data Validation & Sorting in TrasformData function**
   - Check if any items in the line are empty
   - check that the points array is not empty
   - Sort points by x-coordinate
   - It is called in useChartData hook

2. **Calc min and max in calculateBounds function**

- We need to shape the boundries of the canvas so we need to know the range of x and y values
- Canvas size are calculated based on the device ratio

3. **Draw basic setup such as grid and labels**
4. **Poin mapping**

- Make sure all the points are in the 0 to 1 scale
- Flip the y values because y axis is inverted in canvas

5. **Drawing Lines**
   - All lines are rendered on a single canvas
   - Each line is drawn with its specified color

## Settings & Theme Management

- **Theme Selection**: A setting to change the theme (light/dark) is implemented and affects the whole app
- **State Management**: Theme preference is stored in Redux and persisted in localStorage
- **SyncTheme Component**: Uses `useLayoutEffect` to set the `data-theme` attribute before the browser paints, preventing flicker during theme changes

## Button Component

### Large Button Padding

- The vertical padding is 8px for large buttons, not the horizontal padding

### Selected State

- The selected state for secondary buttons is implemented as a prop
- When `selected={true}`, secondary buttons display a white border

### Focus Testing

- **Important**: Use the Tab key to navigate and test focus states
- The component uses `:focus-visible` pseudo-class (better UX practice than `:focus`) which only shows focus indicators for keyboard navigation, not mouse clicks

### Color Accuracy

- Secondary button colors were approximated using a color picker from the design reference
- Colors may not be 100% accurate; a Figma file would provide exact color values

## Technical Decisions

- **SCSS Modules**: Used `@use` instead of `@import` for better module system support
- **Theme Variables**: CSS custom properties (`--color-*`) are used for theme-aware styling
- **Responsive Design**: Chart uses ResizeObserver to adapt to container size changes
