let expect = chai.expect;

describe('Reservar un horario', function() {
    it('Eliminación del horario luego de ser reservado', function(horario) {
        restaurant.reservarHorario(horario);
        expect(restaurant.horario).to.not.include(horario);
    })
    it('El arreglo es el mismo cuando se intenta eliminar un horario que no existe', function(horario) {
        var horarios = restaurant.horario
        restaurant.reservarHorario(horario);
        expect(restaurant.horario).to.have.ordered.members(horario);
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


describe('Obtener puntuación', function() {
    it('Eliminación del horario luego de ser reservado', function(horario) {
        restaurant.reservarHorario(horario);
        expect(restaurant.horario).to.not.include(horario);
    })
    it('El arreglo es el mismo cuando se intenta eliminar un horario que no existe', function(horario) {
        var horarios = restaurant.horario
        restaurant.reservarHorario(horario);
        expect(restaurant.horario).to.have.ordered.members(horario);
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