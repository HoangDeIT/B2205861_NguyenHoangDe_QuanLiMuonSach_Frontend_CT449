import createApiClient from "./api.service";

class TheoDoiMuonSachService {
    constructor() {
        this.api = createApiClient("/api/v1/muon");
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
    async getDocGiaById(id) {
        const res = await this.api.get(`/${id}`);
        return res.data;
    }
}

export default new TheoDoiMuonSachService();
