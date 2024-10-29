import globalApiUri from "../../shared/services/GlobalAPI.ts";
import axios from "axios";
import {SigninRequest} from "../model/SigninRequest.ts";

export function login(SigninRequest: SigninRequest) {
    return axios.post<SigninRequest>(`${globalApiUri}/auth/signin`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function signup() {
    return axios.post<SigninRequest>(`${globalApiUri}/auth/signup`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}