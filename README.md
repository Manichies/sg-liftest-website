# SG Lift Inspection & Testing Website

## Prerequisites

Before starting, make sure you have **Node.js** installed (version 18 or higher).

Download it from: https://nodejs.org (choose the LTS version)

To check if you already have it, open your terminal and run:
```
node --version
```
If it shows v18.x.x or higher, you're good to go.


## Step-by-Step Setup in VS Code

### Step 1: Open the project folder in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Navigate to and select the `sg-liftest-website` folder
4. Click **Open**

You should see the project files in the left sidebar (Explorer panel).


### Step 2: Open the Terminal in VS Code

Press **Ctrl + `** (backtick key, usually above Tab) to open the built-in terminal.

Or go to **Terminal → New Terminal** from the menu bar.


### Step 3: Install dependencies

In the terminal, type:
```
npm install
```

Wait for it to finish (may take 30–60 seconds). You'll see a `node_modules` folder appear in the sidebar.


### Step 4: Launch the development server

In the terminal, type:
```
npm run dev
```

You should see output like:
```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Your browser will automatically open to `http://localhost:3000` showing the website!


### Step 5: Start editing

- The main website code is in `src/App.jsx`
- Global styles are in `src/index.css`
- Changes you make will **instantly reflect** in the browser (hot reload)


## How to Stop the Server

Press **Ctrl + C** in the terminal to stop the development server.


## How to Build for Production (Deployment)

When you're ready to deploy to a real web server:

```
npm run build
```

This creates a `dist/` folder with optimized static files you can upload to any web host (Netlify, Vercel, your own server, etc.).


## Project Structure

```
sg-liftest-website/
├── index.html              ← HTML entry point
├── package.json            ← Project config & dependencies
├── vite.config.js          ← Vite build tool config
├── public/
│   └── favicon.svg         ← Browser tab icon
└── src/
    ├── main.jsx            ← React entry (mounts the app)
    ├── index.css           ← Global styles & resets
    └── App.jsx             ← THE MAIN WEBSITE CODE (all pages)
```


## Troubleshooting

| Problem | Solution |
|---------|----------|
| `node: command not found` | Install Node.js from https://nodejs.org |
| `npm install` fails | Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again |
| Port 3000 already in use | Change the port in `vite.config.js` (e.g., to 3001) |
| Blank white page | Open browser console (F12) and check for errors |


## Adding the PDF Catalogues

Place the two PDF files in the `public/` folder:
- `Lift-testing-equpiment-catelog.pdf`
- `escalator-testing-equipment-catelog.pdf`

Then you can link to them in the code as `/Lift-testing-equpiment-catelog.pdf` etc.
