import privateClient from "./client";

const foodEndpoints = {
    add: "/carts",
    get: "/my-cart",
    delete: "/carts",
    update: "/carts"
};

const cartApi = {
    getMyCart: async () => {
        try {
            const response = await privateClient.get(foodEndpoints.get)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    addToCart: async (data) => {
        try {
            const response = await privateClient.post(foodEndpoints.add, {
                ...data
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    updateFromCart: async (data) => {
        try {
            const response = await privateClient.patch(foodEndpoints.update, {
                ...data
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    deleteFromCart: async (id) => {
        try {
            const response = await privateClient.delete(foodEndpoints.delete, {
                food_id: id
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    }
}

export default cartApi

