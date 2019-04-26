'use strict'

import { ServerUser } from "./user";
import { Client, ActivityType } from "discord.js";

export class Bot extends ServerUser {

    bot:Client;

    constructor(bot:Client) {
        super(bot);
        this.bot = bot;
    }

    onReady = (token:string, message:string = "") => {
        this.bot.login(token)
        this.bot.on('ready', () => {
            console.log(message == "" ? `${this.bot.user.tag} has connected.` : message);
        });
    }

    onReadySetStatus = (token:string, message:string, game:string, state:ActivityType, url="") => {
        this.bot.login(token)
        this.bot.on('ready', () => {
            console.log(message == "" ? `${this.bot.user.tag} has connected.` : message);
            state = "WATCHING" || "PLAYING" || "STREAMING" || "LISTENING";
            this.bot.user.setPresence({
                game: {
                    name: game,
                    type: state,
                    url: url
                }
            });
        });
    }
}
