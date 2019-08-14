const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "{";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);// لا تغير فيها شيء
onst Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const newUsers = [];
const fs = require("fs")

// Error en warning berichten.
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(config.prefix.length).toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`The command ${args[0]} has been reloaded`);
};

client.login(config.token);exports.run = (client, message, args) => {
  const modRole = message.guild.roles.find("name", "Discord Admin");
  if (!modRole) 
    return console.log("The Discord Admin role does not exist.");

  if (!message.member.roles.has(modRole.id))
    return message.reply("You can't use this command.");

   // Verandert de prefix van de command (vb. "!prefix +" ontvangt de "+" dus word het "+prefix").
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      // Verandert de configuratie in memory
      config.prefix = newPrefix;
      // Slaat het bestand op.
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}
