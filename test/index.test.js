import * as chai from "chai";
import chaiHttp from "chai-http";
import { request } from "chai-http";
import app from '../index.js'


const { expect } = chai;
chai.use(chaiHttp);


describe('API de Animes', () => {
    it('Debería devolver con ¡Servidor funcionando correctamente!', async () => {
        const res = await request.execute(app).get('/');
        expect(res).to.have.status(200);
        expect(res.text).to.equal('¡Servidor funcionando correctamente!');
    });

    it('Debería devolver con los datos del archivo JSON en la ruta /animes', async () => {
        
        const res = await request.execute(app).get('/animes');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
    });
    it('Debería devolver un anime específico por ID', async () => {
        
        const res = await request.execute(app).get('/animes/1');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('nombre'); 
        expect(res.body.nombre).to.equal('Akira'); 
    });
    
    it('Debería devolver un anime específico por nombre', async () => {
        
        const res = await request.execute(app).get('/animes/akira');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('nombre');
        expect(res.body.nombre).to.equal('Akira'); 
    });
});
