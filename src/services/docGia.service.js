import createApiClient from "./api.service";

class DocGiaService {
    constructor() {
        this.api = createApiClient("/api/v1/reader");
    }

    async getAll(page, limit, search) {
        // Giả sử backend tìm kiếm theo DIENTHOAI
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

}

export default new DocGiaService();
