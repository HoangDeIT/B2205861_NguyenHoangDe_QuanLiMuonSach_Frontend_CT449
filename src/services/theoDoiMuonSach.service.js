import createApiClient from "./api.service";

class TheoDoiMuonSachService {
    constructor() {
        this.api = createApiClient("/api/v1/muon");
    }

    async getAll(page, limit, isTra) {
        const res = await this.api.get("/", { params: { page, limit, isTra } });
        return res.data;
    }

    async create(data) {
        const res = await this.api.post("/", data);
        return res.data;
    }

    async update(data) {
        const res = await this.api.patch("/", data);
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
    async postTraSach(id) {
        const res = await this.api.post(`/${id}`);
        return res.data;
    }
    async MuonSachByUser(MASACH) {
        const res = await this.api.post("/user", { MASACH })
        return res.data
    }
    async chiTietMuonSachByUser() {
        const res = await this.api.get("/user")
        return res.data
    }
}

export default new TheoDoiMuonSachService();
