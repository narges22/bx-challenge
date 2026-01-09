## Introduction
Thank you for taking the time to participate in our technical challenge.
Before you begin, we’d like to share a few notes to help you approach it with confidence.

This challenge is designed to evaluate your practical skills—not to trick you. There are several key requirements that we ask you to follow closely, and those will form the core of our assessment. In areas where details are not specified, we encourage you to make your own decisions. If we leave something open (for example, visual layout), it’s because we want to understand your creativity, independence, and problem-solving approach.

You are absolutely welcome to go beyond the minimum requirements. In fact, we encourage it. That said, keep in mind that any additional features will still be evaluated, even if they’re not perfectly implemented—not as a “gotcha,” but to help us understand both your baseline and your strengths. If there’s a feature you’re confident in and it’s not explicitly mentioned, feel free to include it. It helps us get to know your capabilities more fully.

With that in mind, let’s move on to the challenge itself.

## The Chart Challenge

Build a small React application that displays a simple chart based on data retrieved from the provided API. You will also receive a design for a button component, which should be implemented as closely as possible. Everything else about the UI is up to you.

### Key Requirements:

- The application must include **three pages**:

  - `/chart` – Displays your chart (details below).

  - `/settings` – Contains application-wide settings. Feel free to choose meaningful global settings such as theme, language, or anything else that affects the overall app.

  - `/buttons` – A component-library-style page showcasing all states of the provided button design. You may design the page freely, but all button variants must be visible and interactive.

- The app must use **react-router** for routing.

- The app must use **redux** to store essential application state that should be accessible globally.

- Include at least **one custom data hook** — for example, retrieving the current UI theme or other shared data.

- Add **JSDoc documentation** above components or functions where appropriate.

- Do <u>**not**</u> modify the dependencies or devDependencies in `package.json`.

- Follow the provided **Prettier** and **ESLint** configuration rules.

### Chart Requirements:

The chart must be rendered using a **canvas**.
The API will return an array of lines.
Each line has its data points in the form `[x, y]` along with a name and a colour.
At minimum, your chart should display a simple line-graph connecting these points.
Any enhancements beyond this (interactivity, styling, scaling, etc.) are optional but will be appreciated—even if not perfect.

### Additional Notes:

- For the buttons page, we’re particularly interested in how accurately you can implement the provided designs.

- While we supply an API with fixed data, we will also test your chart using a different endpoint with the same structure but different values. Please build your solution with that in mind.

## Resources:
- API `https://brainx.sk/api/chart-data` (supports **GET** method)
- Buttons design: `https://brainx.sk/buttons.png`