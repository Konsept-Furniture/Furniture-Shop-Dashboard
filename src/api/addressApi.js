import privateClient from "./client";

const addressEndpoints = {
  list: "/my-address",
  add: "/addresses",
  delete: (id) => `/addresses/${id}`,
};

const addressApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(addressEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
},

  addAddress: async (data) => {
    try {
      const response = await privateClient.post(addressEndpoints.add, {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  deleteAddress: async (id) => {
    console.log(id);
    try {
      const response = await privateClient.delete(addressEndpoints.delete(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default addressApi;
