import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/v1/auth") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async loginWithUser(data) {
        return (await this.api.post("/login/user", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
}
export default new AuthService();