const User = require("../models/User");

// Créer un utilisateur
const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
};

// Trouver un utilisateur par son ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la recherche de l'utilisateur : " + error.message);
    }
};

// Mettre à jour un utilisateur
const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur : " + error.message);
    }
};

// Supprimer un utilisateur
const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la suppression de l'utilisateur : " + error.message);
    }
};

// Lister tous les utilisateurs
const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des utilisateurs : " + error.message);
    }
};

module.exports = {
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    findAllUsers,
};