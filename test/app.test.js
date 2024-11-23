const request = require("supertest")
const app = require("../app")

describe("Tests Equipos", () => {

    it("should register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ nombre: "Wolfram City" })
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.equipos.nombre).toEqual("Wolfram City")
    })

    it("should not register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ nombre: "USAD Champu", error: "no entra" })
            .set("Accept", "application/json")
            .expect(400)
    })

    it("should get all teams", async () => {
        const response = await request(app)
            .get("/api/equipos")
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.data.pop().nombre).toEqual("Wolfram City")
    })
})
