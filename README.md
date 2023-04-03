# FlowGPT

FlowGPT is a playground to visualy generate prompts for ChatGPT. It helps you 
create better prompts by providing an interface to explore various modifiers and 
compare your results in one place.

## Install

### Download and install the app

```bash
git clone https://github.com/hiasinho/flow-gpt.git
cd flow-gpt
npm install
```

### Configure

Make a copy of `.env.example` and rename it to `.env` to set your OpenAI
credentials

```bash
cp .env.example .env
```

```bash
# .env
OPENAI_API_ORG=your-api-org
OPENAI_API_KEY=your-api-key
```

## Features

- Create Prompts, Modifiers and Results by using the Toolbar (top-left corner)
- Connect them using connection lines
- Use result objects to generate ChatGPT responses
- Arrange everything visualy and explore multiple paths

## If you're here for the tech

### Stack

FlowGPT is built using:

- Next.js
- tRPC
- Tailwind
- zustand including local storage persistence and immer.js
- React Flow
- OpenAI API

### Structure

Everything is located under the `src/` directory.

```
presentation/ - Presentational layer (components like Buttons)
lib/ - Custom libraries or library wrappers
domains/ - Holds the concepts
pages/ - All routes
server/ - Server-side components
utils/ - Utility functions
```

### Please note
This repository doesn't hold any integration or unit tests. It's a prototype
with focus on exploration.
