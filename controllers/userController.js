const userService = require("../services/userService");
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = jwt.sign(
            { userId: user._id , role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Expire dans 24h
        );

        res.status(200).json({
            user: user,
            token
        });
    } catch (error) {
        res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
};

// Créer un utilisateur
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(userService.sanitizeUser(user));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Trouver un utilisateur par son ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        res.status(200).json(userService.sanitizeUser(user));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(userService.sanitizeUser(user));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lister tous les utilisateurs
const getAllUsers = async (req, res) => {
    console.log("getAllUsers");
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    loginUser
};