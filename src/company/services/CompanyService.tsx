import axios from "axios";
import { globalApiUrl } from "../../shared/services/GlobalAPI.ts";
import {CompanyUpdateRequest} from "../model/CompanyUpdateRequest.ts";

export const fetchCompanyById = (id: number) => {
  return axios.get(`${globalApiUrl}/companies/${id}`).then((res) => res.data);
};

export const updateCompanyById = (id: number, companyData: CompanyUpdateRequest) => {
  return axios.put(`${globalApiUrl}/companies/${id}`, companyData).then((res) => res.data);
};
