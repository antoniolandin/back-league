const request = require("supertest")
const app = require("../app")

var id_equipo = null
var id_jugador = null
var id_usuario = null

var token = ''

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
    })

    it("should login a user", async () => {
        const response = await request(app)
            .post("/api/usuarios/login")
            .send({ email: "antonio@gmail.com", contraseña: "Anto1234" })
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.usuario.email).toEqual("antonio@gmail.com")

        id_usuario = response.body.usuario.id
        token = response.body.token
    })
})

describe("Tests fantasy teams", () => {
    var id = null

    it("should create a fantasy team", async () => {
        const response = await request(app)
            .post("/api/fantasy_equipos")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Fantasy Test" })
            .expect(200)

        expect(response.body.id_usuario).toEqual(id_usuario)
        id = response.body.id
    })

    it("should get all fantasy teams", async () => {
        const response = await request(app)
            .get("/api/fantasy_equipos")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)

        expect(response.body.pop().id_usuario).toEqual(id_usuario)
    })

    it("should get user fantasy team", async () => {
        const response = await request(app)
            .get("/api/fantasy_equipos/equipo")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
         
        expect(response.body[0].nombre).toEqual("Fantasy Test")
    })

    it("should add a new player to a fantasy team", async () => {
        const response = await request(app)
            .post("/api/fantasy_equipos/jugadores")
            .send({ id_equipo_fantasy: id, id_jugador: id_jugador })
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
        
        expect(response.body[0].id_jugador).toEqual(id_jugador)
        expect(response.body[0].id_equipo_fantasy).toEqual(id)
    })

    it("should get all players of a fantasy team", async () => {
        const response = await request(app)
            .get("/api/fantasy_equipos/" + id + "/jugadores/")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
        
        expect(response.body.pop().id).toEqual(id_jugador)
    })
})

describe("Tests partidos", () => {
    
    var id = null

    it("should create a partido", async () => {
        const response = await request(app)
            .post("/api/partidos")
            .send({ id_equipo_1: id_equipo, id_equipo_2: id_equipo, jornada: 4, fecha: "2025-01-01T17:00:00" })
            .set("Accept", "application/json")
            .expect(201)

        expect(response.body.partido.jornada).toEqual(4)
        id = response.body.partido.id
    })

    it("should create another partido", async () => {
        const response = await request(app)
            .post("/api/partidos")
            .send({ id_equipo_1: id_equipo, id_equipo_2: id_equipo, goles_1: 2, goles_2: 1, jornada: 3, fecha: "2024-12-12T17:00:00" })
            .set("Accept", "application/json")
            .expect(201)
        
        expect(response.body.partido.jornada).toEqual(3)
    })

    it("should get all partidos", async () => {
        const response = await request(app)
            .get("/api/partidos")
            .set("Accept", "application/json")
            .expect(200)
        console.log(response.body)
        expect(response.body.length).toEqual(1)
    })

    it("should get next partidos", async () => {
        const response = await request(app)
            .get("/api/partidos/proximos")
            .set("Accept", "application/json")
            .expect(200)
        console.log(response.body)
        expect(response.body.length).toEqual(1)
    })

    it("should get equipos of partido", async () => {
        const response = await request(app)
            .get("/api/partidos/" + id)
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.length).toEqual(2)
    })
})
