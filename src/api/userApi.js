import privateClient from './client'

const userEndpoints = {
   list: '/users',
   login: '/authenticate',
   register: '/register',
   forgotPassword: '/forgot-password',
   profile: '/profile',
   listOrderByUserId: userId => `/orders/list-order/${userId}`,
   detailUser: userId => `/users/${userId}`,
   delete: userId => `/users/${userId}`
}

const userApi = {
   login: async data => {
      try {
         const response = await privateClient.post(userEndpoints.login, {
            ...data
         })

         return { response }
      } catch (err) {
         return { err }
      }
   },
   register: async data => {
      try {
         const response = await privateClient.post(userEndpoints.register, {
            ...data
         })
         return { response }
      } catch (err) {
         return { err }
      }
   },
   forgotPassword: async data => {
      try {
         const response = await privateClient.post(userEndpoints.forgotPassword, {
            ...data
         })
         return { response }
      } catch (err) {
         return { err }
      }
   },
   profile: async () => {
      try {
         const response = await privateClient.get(userEndpoints.profile)
         return { response }
      } catch (err) {
         return { err }
      }
   },
   getList: async (pagination, filters) => {
      try {
         const response = await privateClient.get(userEndpoints.list, {
            params: {
               limit: pagination.limit,
               page: pagination.page,
               search: filters.search
            }
         })
         return { response }
      } catch (err) {
         return { err }
      }
   },
   listOrderByUserId: async userId => {
      try {
         const response = await privateClient.get(userEndpoints.listOrderByUserId(userId))
         return { response }
      } catch (err) {
         return { err }
      }
   },
   getDetaiUser: async userId => {
      try {
         const response = await privateClient.get(userEndpoints.detailUser(userId))
         return { response }
      } catch (err) {
         return { err }
      }
   },
   delete: async userId => {
      try {
         const response = await privateClient.delete(userEndpoints.delete(userId))
         return { response }
      } catch (err) {
         return { err }
      }
   }
}

export default userApi
