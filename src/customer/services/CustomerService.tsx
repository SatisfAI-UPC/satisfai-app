import axios from "axios";
import { globalApiUrl } from "../../shared/services/GlobalAPI.ts";

export const fetchCustomerById = (id) => {
  return axios
    .get(`${globalApiUrl}/customer/${id}`)
    .then((res) => res.data);
};

export const updateCustomer = (customerData) => {
  return axios
    .put(`${globalApiUrl}/customer/update`, customerData)
    .then((res) => res.data);
};
