## Information

MLBB DraftBuddy is a tool that helps out with you and your allies in the drafting phase. \
DraftBuddy determines the best picks based on the bans and picks of both the enemy and the ally team.

## Installation

Make sure you have Git, Node.js and SQLite3 installed on your 
```bash

# Clone repo
git clone git@github.com:MadlyMoe/mlbbdraftbuddy.git
cd mlbbdraftbuddy

# Install dependencies
npm install
npm install bootstrap
npm install axios

# Set up database & ORM
npx prisma generate
npx prisma migrate dev # this runs all the sql quieries, in the order they've been made

# Run server
npm run dev
```

## Made by:
- MadlyMoe
- tinyConan
- Gameknight999