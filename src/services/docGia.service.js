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
    async getByProfileUser() {
        const res = await this.api.get("/user")
        return res.data
    }
    async updateByUser(data) {
        const res = await this.api.put("/user", data)
        return res.data
    }
    async changePassword(data) {
        const res = await this.api.put("/user/change-password", data)
        return res.data
    }
}

export default new DocGiaService();
