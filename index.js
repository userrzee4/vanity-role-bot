const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

const VANITY_TEXT = "/yeihood"; // change this
const ROLE_ID = "1467543505663688899";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("presenceUpdate", async (oldPresence, newPresence) => {
  if (!newPresence || !newPresence.member) return;

  const member = newPresence.member;

  const hasVanity = newPresence.activities.some(
    act =>
      act.type === ActivityType.Custom &&
      act.state &&
      act.state.toLowerCase().includes(VANITY_TEXT.toLowerCase())
  );

  try {
    if (hasVanity && !member.roles.cache.has(ROLE_ID)) {
