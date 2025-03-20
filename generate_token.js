const jwt = require("jsonwebtoken");

// Données à inclure dans le token (payload)
const payload = {
    userId: "1",
    role: "client",
};

// Clé secrète
const secretKey = "boshkeysecret";

// Options du token (expiration, etc.)
const options = {
    expiresIn: "1565656534h", // Le token expire dans 1565656534 heures
};

// Créer un token
const token = jwt.sign(payload, secretKey, options);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTc0MjQ3OTY1MiwiZXhwIjo1NjM4MTA2MDAyMDUyfQ.l5i3UolT-XP5fp_Ox1fCrI4rIVFSiaCh6lH8eptLBgg
console.log("Token généré :", token);