import axios from "axios";
import { globalApiUrl } from "../../shared/services/GlobalAPI.ts";

export const fetchCompanyById = (id: number) => {
  return axios.get(`${globalApiUrl}/companies/${id}`).then((res) => res.data);
};

export const updateCompany = (id: number, companyData: any) => {
  return axios.put(`${globalApiUrl}/companies/${id}`, companyData).then((res) => res.data);
};
