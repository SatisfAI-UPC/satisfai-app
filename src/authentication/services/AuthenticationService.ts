import {globalApiUrl} from "../../shared/services/GlobalAPI.ts";
import axios from "axios";
import {SigninRequest} from "../model/SigninRequest.ts";
import {SignupRequest} from "../model/SignupRequest.ts";

export function login(signinRequest: SigninRequest) {
    return axios.post(`${globalApiUrl}/auth/signin`, signinRequest)
        .then((response) => response.data.token)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function signup(signUpRequest: SignupRequest) {
    return axios.post(`${globalApiUrl}/auth/signup`, signUpRequest)
        .then((response) => response.data.token)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}
