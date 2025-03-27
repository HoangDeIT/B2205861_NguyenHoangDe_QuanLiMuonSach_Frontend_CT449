import createApiClient from "./api.service";
class StaffService {
    constructor(baseUrl = "/api/v1/staff") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(page, limit, search) {
        return (await this.api.get("/", {
            params: {
                page,
                limit,
                search,
            }
        })).data;
    }
    async create(data) {
        console.log("Creating staff with data:", data);
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.patch(`/`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new StaffService();