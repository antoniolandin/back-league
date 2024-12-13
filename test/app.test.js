const request = require("supertest")
const app = require("../app")

var id_equipo = null
var id_jugador = null

var token = null

describe("Tests Equipos", () => {

    it("should register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ id: 1, nombre: "Wolfram City" })
            .set("Accept", "application/json")
            .expect(201)
        
        expect(response.body.nombre).toEqual("Wolfram City")
        id_equipo = response.body.id
    })

    it("should not register a new team", async () => {
        const response = await request(app)
            .post("/api/equipos")
            .send({ nombre: "Wolfram City" })
            .set("Accept", "application/json")
            .expect(400)
    })

    it("should get a team", async () => {
        const response = await request(app)
            .get("/api/equipos/" + id_equipo)
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.nombre).toEqual("Wolfram City")
    })

    it("should get all teams", async () => {
        const response = await request(app)
            .get("/api/equipos")
            .set("Accept", "application/json")
            .expect(200)

        var equipo = response.body.pop() 
        expect(equipo.nombre).toEqual("Wolfram City")
    })
})

describe("Tests jugadores", () => {
    
    it("should register a new player", async () => {
        const response = await request(app)
            .post("/api/jugadores")
            .send({ id_equipo: 1, nombre: "Alonso", primer_apellido: "Martinez", segundo_apellido: "Garcia", grado: "Licenciado", curso: "2" })
            .set("Accept", "application/json")
            .expect(201)
        
        expect(response.body.nombre).toEqual("Alonso")
        id_jugador = response.body.id
    })

    it("should get a player", async () => {
        const response = await request(app)
            .get("/api/jugadores/" + id_jugador)
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.nombre).toEqual("Alonso")
    })

    it("should get all players", async () => {
        const response = await request(app)
            .get("/api/jugadores")
            .set("Accept", "application/json")
            .expect(200)

        var jugador = response.body.pop()
        expect(jugador.nombre).toEqual("Alonso")
    })
})

describe("Tests Users", () => {
    it("should register a new user", async () => {
        const response = await request(app)
            .post("/api/usuarios/register")
            .send({ nombre: "Antonio", email: "antonio@gmail.com", contraseña: "Anto1234" })
            .set("Accept", "application/json")
            .expect(201)

        expect(response.body.usuario.email).toEqual("antonio@gmail.com")

        token = response.body.token
    })

    it("should login a user", async () => {
        const response = await request(app)
            .post("/api/usuarios/login")
            .send({ email: "antonio@gmail.com", contraseña: "Anto1234" })
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.usuario.email).toEqual("antonio@gmail.com")
    })
})


