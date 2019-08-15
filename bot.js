const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "$"
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
$ban   
client.login(process.env.BOT_TOKEN);// لا تغير فيها شيء

