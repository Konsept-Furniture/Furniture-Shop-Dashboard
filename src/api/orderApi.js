import privateClient from "./client";

const orderEndpoints = {
	create: "/orderes",
	getMyOrders: "/my-order",
	getOrderDetail:(id) => `/orders/${id}`,
	updateStatus:(id) => `/orders/${id}`,
	delete: (id) => `/orders/${id}`,
};

const orderApi = {
  createOrder: async (data) => {
		try {
			const response = await privateClient.post(orderEndpoints.create, {
				...data,
			});
			return { response };
		} catch (err) {
			return { err };
		}
	},

	getMyOrders: async () => {
		try {
			const response = await privateClient.get(orderEndpoints.getMyOrders);
			return { response };
		} catch (err) {
			return { err };
		}
	},

  getOrderDetail: async (id) => {
		try {
			const response = await privateClient.get(orderEndpoints.getOrderDetail(id));
			return { response };
		} catch (err) {
			return { err };
		}
	},

  updateOrderStatus: async (id) => {
		try {
			const response = await privateClient.patch(orderEndpoints.updateStatus(id));
			return { response };
		} catch (err) {
			return { err };
		}
	},

	deleteorder: async (id) => {
		try {
			const response = await privateClient.delete(orderEndpoints.delete(id));
			return { response };
		} catch (err) {
			return { err };
		}
	},
};

export default orderApi;
