import privateClient from "./client";

const favouriteEndpoints = {
  list: "/my-favourite",
  add: "/favourites",
  delete: "/favourites",
};

const favouriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favouriteEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  removeItem: async (data) => {
    try {
      const response = await privateClient.delete(favouriteEndpoints.delete, {
        data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favouriteApi;
