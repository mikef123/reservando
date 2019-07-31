let expect = chai.expect;
let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
let horario = "13:00";
let lista = [restaurant];
var listado = new Listado(lista)
var reserva1 = new Reservation(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
var reserva2 = new Reservation(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")

describe('Reservar un horario', function() {
    it('Eliminación del horario luego de ser reservado', function() {
        let horario = "13:00";
        restaurant.reservarHorario(horario);
        expect(restaurant.horarios).to.not.include("13:00");
    })
    it('El arreglo es el mismo cuando se intenta eliminar un horario que no existe', function() {
        var horarios = restaurant.horarios;
        restaurant.reservarHorario("33:00");
        expect(restaurant.horarios).to.have.ordered.members(horarios);
    })
    it('El arreglo es el mismo cuando se intenta reservar sin un horario', function() {
        let horarios = restaurant.horarios
        restaurant.reservarHorario();
        expect(restaurant.horarios).to.have.ordered.members(horarios);
    })
    it('disminución en un elemento del arreglo de horario luego de ser reservado', function() {
        restaurant.reservarHorario(horario);
        expect(1).to.equal(restaurant.horarios.length - 1);
    })
})


describe('Obtener puntuación', function() {
    var horariosRestaurante = restaurant.horarios
    it('Obtener el promedio de las calificaciones', function() {
        expect(restaurant.obtenerPuntuacion()).to.above(0);
    })
    it('El restaurante no posee recomendaciones', function() {
        var restauranteSinCalificacion = restaurant
        restauranteSinCalificacion.calificaciones = []
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    })
})

describe('Calificacion', function() {
    it('El valor calificado es una letra', function() {
        let calificaciones = restaurant.calificaciones;
        restaurant.calificar('Hola');
        expect(restaurant.calificaciones).to.eql(calificaciones);
    })
    it('El valor calificado es menor a 0', function() {
        let calificaciones = restaurant.calificaciones;
        restaurant.calificar(0);
        expect(restaurant.calificaciones).to.eql(calificaciones);
    })
    it('Se califica un restarurante con un valor numerico entre 1 y 9', function() {
        let calificaciones = restaurant.calificaciones.length
        restaurant.calificar(2);
        expect(restaurant.calificaciones).to.have.lengthOf(calificaciones + 1);
    })
})

describe('Buscar restaurante por id', function() {
    it('El id a buscar no existe', function() {
        resultado = listado.buscarRestaurante(200);
        expect(resultado).to.be.an('string');
    })
    it('El id a buscar existe', function() {
        let resultado = listado.buscarRestaurante(1);
        expect(restaurant).to.be.an('object');
    })
})

describe('Obtener restaurante', function() {
    it('los parametros de búsqueda son null', function() {
        let restaurantes = listado.restaurantes
        let resultado = listado.obtenerRestaurantes(null, null, null);
        expect(resultado).to.have.ordered.members(restaurantes);
    })
    it('El id a buscar existe', function() {

        let resultado = listado.obtenerRestaurantes(null, null, "33:00");
        expect(resultado).to.be.a('array').that.is.empty;
    })
})

describe('Calcular el precio de una reserva', function() {
    it('calcular el precio de la reserva base', function() {
        let resultado = reserva1.calcularPrecioBaseReserva();
        expect(resultado).to.equal(2800);
    })
    it('calcular el precio final', function() {
        let resultado = reserva1.precioFinalReserva();
        expect(resultado).to.equal(2387);
    })
})