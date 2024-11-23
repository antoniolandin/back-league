const request = require("supertest")
const app = require("../app")

describe("Tests Equipos", () => {

    var id = 1

    it("should register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ nombre: "Wolfram City" })
            .set("Accept", "application/json")
            .expect(201)
        console.log(response.body)
        expect(response.body.nombre).toEqual("Wolfram City")
    })

    it("should not register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ nombre: "Wolfram City" })
            .set("Accept", "application/json")
            .expect(400)
    })

    it("should get all teams", async () => {
        const response = await request(app)
            .get("/api/equipos")
            .set("Accept", "application/json")
            .expect(200)

        var equipo = response.body.pop() 
        expect(equipo.nombre).toEqual("Wolfram City")
        id = equipo.id
    })

    it("should delete a team", async () => {
        const response = await request(app)
            .delete("/api/equipos/" + id)
            .set("Accept", "application/json")
            .expect(200)
        
        console.log(response.body)
        expect(response.body.message).toEqual("Equipo eliminado")
    })
})
