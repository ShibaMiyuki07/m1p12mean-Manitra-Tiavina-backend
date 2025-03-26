const User = require("../models/User");
const bcrypt = require('bcrypt');

// Login
const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Identifiants incorrects');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Identifiants incorrects');

    return {
        _id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile
    };
};

// Créer un utilisateur
const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
};

// Ajout d'une méthode pour ne pas exposer les mots de passe
const sanitizeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
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
        return sanitizeUser(user);
    } catch (error) {
        throw new Error("Erreur lors de la suppression de l'utilisateur : " + error.message);
    }
};

// Lister tous les utilisateurs
const findAllUsers = async () => {
    try {
        const users = await User.find().select('-password');
        return users.map(user => sanitizeUser(user));
    } catch (error) {
        throw new Error("Erreur lors de la récupération des utilisateurs : " + error.message);
    }
};

module.exports = {
    loginUser,
    sanitizeUser,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    findAllUsers,
};