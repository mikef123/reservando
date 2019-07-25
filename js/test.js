let expect = chai.expect;

describe('Reservar un horario', function() {
    it('Eliminación del horario luego de ser reservado', function() {
        restaurant.reservarHorario("13:00");
        expect(restaurant.horario).to.not.include("13:00");
    })
    it('El arreglo es el mismo cuando se intenta eliminar un horario que no existe', function() {
        var horarios = restaurant.horario
        restaurant.reservarHorario("33:00");
        expect(restaurant.horario).to.have.ordered.members(horarios);
    })
    it('El arreglo es el mismo cuando se intenta reservar sin un horario', function() {
        var horarios = restaurant.horario
        restaurant.reservarHorario();
        expect(restaurant.horario).to.have.ordered.members(horarios);
    })
    it('disminución en un elemento del arreglo de horario luego de ser reservado', function(horario) {
        restaurant.reservarHorario(horario);
        expect(restaurant.horario.length).to.equal(restaurant.horario.length - 1);
    })
})


describe('Obtener puntuación', function() {
    it('Obtener el promedio de las calificaciones', function() {
        expect(restaurant.obtenerPuntuacion()).to.above(0);
    })
    it('El restaurante no posee recomendaciones', function(horario) {
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    })
    it('El arreglo es el mismo cuando se intenta reservar sin un horario', function() {
        var horarios = restaurant.horario
        restaurant.reservarHorario();
        expect(restaurant.horario).to.have.ordered.members(horario);
    })
    it('disminución en un elemento del arreglo de horario luego de ser reservado', function(horario) {
        restaurant.reservarHorario(horario);
        expect(restaurant.horario.length).to.equal(restaurant.horario.length - 1);
    })
})

describe('Calificacion', function() {
    it('El valor calificado es una letra', function() {
        let calificaciones = restaurant.calificaciones;
        restaurant.calificar('Hola');
        expect(restaurant.calificaciones).to.eql(calificaciones);
    })
    it('El valor calificado es menor a 0', function(horario) {
        let calificaciones = restaurant.calificaciones;
        restaurant.calificar(-5);
        expect(restaurant.calificaciones).to.eql(calificaciones);
    })
    it('Se califica un restarurante con un valor numerico entre 1 y 9', function() {
        var horarios = restaurant.horario
        restaurant.reservarHorario();
        expect(restaurant.horario.length).to.above(horarios.length);
    })
})

describe('Buscar restaurante por id', function() {
    it('El id a buscar no existe', function() {
        let resultado = listado.buscarRestaurante(200);
        expect(resultado).to.be.an('array');
    })
    it('El id a buscar existe', function() {
        let resultado = listado.buscarRestaurante(1);
        expect(restaurant.calificaciones).to.be.an('object');
    })
})

describe('Obtener restaurante', function() {
    it('los parametros de búsqueda son null', function() {
        let restaurantes = this.restaurantes
        let resultado = listado.obtenerRestaurantes(null,null,null);
        expect(resultado).to.have.ordered.members(restaurantes);
    })
    it('El id a buscar existe', function() {
       
        let resultado = listado.obtenerRestaurantes(null,null,"33:00");
        expect(resultado).to.be.a(false);
    })
})