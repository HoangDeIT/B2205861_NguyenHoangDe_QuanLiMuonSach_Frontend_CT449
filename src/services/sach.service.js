import createApiClient from "./api.service";

class SachService {
    constructor() {
        this.api = createApiClient("/api/v1/sach");
    }

    async getAll(page, limit, search) {
        const res = await this.api.get("/", { params: { page, limit, search } });
        return res.data;
    }

    async create(data) {
        const res = await this.api.post("/", data);
        return res.data;
    }

    async update(data) {
        const res = await this.api.put("/", data);
        return res.data;
    }

    async delete(id) {
        const res = await this.api.delete(`/${id}`);
        return res.data;
    }
    async getAllNoPagination() {
        const res = await this.api.get("/get-all");
        return res.data;
    }
}

export default new SachService();
