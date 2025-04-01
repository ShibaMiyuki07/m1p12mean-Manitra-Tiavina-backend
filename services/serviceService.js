const Service = require("../models/Service");

// Créer une reservation
const createService = async (serviceData) => {
    try {
        const service = new Service(serviceData);
        await service.save();
        return service;
    } catch (error) {
        throw new Error("Erreur lors de la création du nouveau service : " + error.message);
    }
};

// Trouver un utilisateur par son ID
const findServiceById = async (serviceId) => {
    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error("Service non trouvé");
        }
        return service;
    } catch (error) {
        throw new Error("Erreur lors de la recherche du service : " + error.message);
    }
};

// Mettre à jour une reservation
const updateService = async (serviceId, updateData) => {
    try {
        const service = await Service.findByIdAndUpdate(serviceId, updateData, { new: true });
        if (!service) {
            throw new Error("Service non trouvé");
        }
        return service;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du service : " + error.message);
    }
};

// Supprimer une reservation
const deleteService= async (serviceId) => {
    try {
        const service = await Service.findByIdAndDelete(serviceId);
        if (!service) {
            throw new Error("Service non trouvé");
        }
        return service;
    } catch (error) {
        throw new Error("Erreur lors de la suppression du service : " + error.message);
    }
};

// Lister tous les reservations
const findAllServices= async () => {
    try {
        return await Service.find();
    } catch (error) {
        throw new Error("Erreur lors de la récupération des services : " + error.message);
    }
};

async function getServicesGroupedByCategory() {
    try {
        const results = await Service.aggregate([
            {
                $group: {
                    _id: "$category",
                    services: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            description: "$description",
                            price: "$price",
                            duration: "$duration",
                            image: "$image",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return results.map(group => ({
            category: group._id,
            services: group.services,
            serviceCount: group.count
        }));

    } catch (error) {
        throw new Error(`Erreur lors du regroupement des services: ${error.message}`);
    }
}

module.exports = {
    createService,
    findServiceById,
    updateService,
    deleteService,
    findAllServices,
    getServicesGroupedByCategory
};