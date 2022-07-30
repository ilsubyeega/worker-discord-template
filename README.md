# worker-discord-template
Discord bot template for Cloudflare Workers.
- The interaction endpoint url is `/` itself.

# Environment Variables
Put your environment variables with `wrangler secret put [KEY]`
- `BOT_TOKEN` : Discord Bot Token
- `PUBKEY` : Public Key for your discord bot (Available in General Information section)
- `APPLICATION_ID` : Application ID for your discord bot
- `DEVSECRET` : The secret code that you can use `/register` for registering the commands

# Structure
```
src
├── autocompletes # The set of autocompletes
├── commands # The set of commands
├── components # The set of components
├── modals # The set of modals
└── lib # The misc things such like types are here 
index.ts # Main file that does every web stuffs, and registering commands.
registered.ts # Insert the commands, autocompletes, components, modals in the registered.ts
```
# LICENSE
MIT