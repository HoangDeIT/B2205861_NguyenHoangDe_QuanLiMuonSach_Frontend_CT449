import createApiClient from "./api.service";

class NhaXuatBanService {
    constructor() {
        // Endpoint backend cho NXB: /api/v1/nxb
        this.api = createApiClient("/api/v1/nxb");
    }

    async getAll(page, limit, search) {
        const res = await this.api.get("/", {
            params: { page, limit, search },
        });
        return res.data; // { data, total, totalPages, currentPage }
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
}

export default new NhaXuatBanService();
