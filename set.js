const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVAzUENLRmFpTkJRQXY3VG1tanJQSTErS1Q1TVpCdDkzNDhzTlZsWjkxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2txMWdBQTBwUzkxM2hPZWJ2UW1jMUVWZWpoN2NkcTdaN3dCRUd5ZXltND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTzk1NW1IVWFxYWlObmxEQytmNnk2emFYWU1SeEl6UmZ2bU5kZExtdG5ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZaUppMEo4c3pGWUllaVVCMFdYVkFqdVlVVk1xUk9BVWhZVXNTd1FDa0NBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitONGE5UHRRN0FSWFA3KzZPblJ4L09kUkNQZ1U1dmNEcFErRnFWYkdxbTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1LcVoyZ0IwTnExYUdXT2pCc1dBZnVkMTBsUzMxTWRQYUh4N0psczRHbW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0F3RjQxTTNJNEw2TnJMNURablhqWW5BWmhWSGdBKzNkSzJCeTJVbGdWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSk5wYWZrcEY2V3dnWG5iRjlhK3JkRUFDREFYWStlQ205MjY5dGdJWWlsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFpSGdmNHZKY2RBTE1rL2I5Ny96YkZpVjE2RWZ5ZFVuUnZ2Uzk0ZnB6dUFzOFBQQ0U3Y3dhN0VoMlAzZ1hrTGtMVkZ3NS90VXBCNW5zWk85QVRORWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJaOThudTNzVEN3L3R4M2dubTZ2TDVmWW9BK1pZbE9yMU1ZWEg5V2FCSHJrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5S2ZuR19mMFMzdTF2bHNmX3g4dGlRIiwicGhvbmVJZCI6IjQzNTAwYjVmLTMwOGMtNGEzNi04YzUyLWMxM2UwNmYwNTIyYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzcTBQQ2wybDcyL3FhSnVRUVhjT3RKSjZ6WFU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoici9mZm01RllYM2ZjNmJYWWhjUzJKQUNYWGNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQzR1BFRFNBIiwibWUiOnsiaWQiOiIyMzQ4MTM5NTk4OTg1OjEzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQcXMxRDRRcGVTOXRnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlVzlMc215RkxNZjJYQUk2TndJdUxKa2lwZXUyMHRYWDFkNHVTZlZLSlNnPSIsImFjY291bnRTaWduYXR1cmUiOiJzOTlFdW4wK3RSMXlLQkFaWXRFNHNPaDc2YVRFN0pnOUh3K2VsUlg2UUNFakJ3dkhkd2xuVGh4VEhDcDkvcStLbkIvVWttWndLZ0FDeUpFanA0dTVBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaEZ3MVhac2N2eU5nY2dMNUxFNC9zMlBOb0gvSUNyVXBla2FaeEdWNDJJWHJ0WGZ4RjI5aTdmUUVBWVUwMGxLS3FnRmVySkpWSng0VCswcEQ3UUMrZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM5NTk4OTg1OjEzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhsdlM3SnNoU3pIOWx3Q09qY0NMaXlaSXFYcnR0TFYxOVhlTGtuMVNpVW8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ4NzEyMTgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSU1yIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Cr7 supreme",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348139598985", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

