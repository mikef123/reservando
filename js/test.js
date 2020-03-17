let expect = chai.expect;

describe('Reservar un horario', function () {
    it('Dado un restaurante con el horario 13:00, al reservar ese horario, se elimina ese horario de su lista de horarios a reservar', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        let horario = "13:00";
        restaurant.reservarHorario(horario);
        expect(restaurant.horarios).to.not.include("13:00");
    })
    it('Dado un restaurante, sus horarios se mantienen intactos cuando se intenta eliminar un horario que no existe de su lista de horarios', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var horarios = restaurant.horarios;
        restaurant.reservarHorario("33:00");
        expect(restaurant.horarios).to.have.ordered.members(horarios);
    })
    it('Dado un restaurante su lista de horarios no será modificada si se intenta hacer una reservación sin hora', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        let horarios = restaurant.horarios
        restaurant.reservarHorario();
        expect(restaurant.horarios).to.have.ordered.members(horarios);
    })
    it('Dado un restaurante su lista de horarios será disminuido en uno luego de ser escogido reservado', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        let horario = "13:00";
        restaurant.reservarHorario(horario);
        expect(1).to.equal(restaurant.horarios.length - 1);
    })
})


describe('Obtener puntuación', function () {
    it('Dado un restaurante con calificaciones de [6, 7, 9, 10, 5] el promedio de sus calificaciones es 7.4', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var horariosRestaurante = restaurant.horarios
        expect(restaurant.obtenerPuntuacion()).to.equal(7.4);
    })
    it('Dado un restaurante que no posea recomendaciones el promedio de su puntuación es igual a 0', function () {
        var restauranteSinCalificacion = new Restaurant()
        restauranteSinCalificacion.calificaciones = []
        expect(restauranteSinCalificacion.obtenerPuntuacion()).to.equal(0);
    })
})

describe('Calificacion', function () {
    it('Dado un restaurante y se desea adicionar una calificación no numerica "Hola", no debe agregarse al arreglo de calificaciones', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]);
        restaurant.calificar("hola");
        expect(restaurant.calificaciones).to.eql([7]);
    })
    it('Dado un restaurante donde el valor calificado es 5 el arreglo de calificaciones queda []', function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]);
        restaurant.calificar(5);
        expect(restaurant.calificaciones).to.eql([7, 5]);
    })
})

describe('Buscar restaurante por id', function () {
    var restaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]),
        new Restaurant(2, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]),
        new Restaurant(3, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7])
    ];
    it('Dado una lista de restaurantes, al buscar el restaurante con el id 1, se obtiene el restaurante correcto', function () {
        var listado = new Listado(restaurantes);
        resultado = listado.buscarRestaurante(1);
        expect(resultado.id).to.equal(1);
    })
    it('Dado una lista de restaurantes, al buscar un restaurante con id 5 que no existe en la lista arroja el mensaje "No se ha encontrado ningún restaurant"', function () {
        var listado = new Listado(restaurantes);
        let resultado = listado.buscarRestaurante(5);
        expect(resultado).to.equal("No se ha encontrado ningún restaurant");
    })
})

describe('Obtener restaurante', function () {
    var restaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]),
        new Restaurant(2, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7]),
        new Restaurant(3, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [7])
    ];
    it('Dado un listado con 3 restaurantes, si no se aplica ningún filtro, se obtiene como resultado 3 restaurante', function () {
        var listado = new Listado(restaurantes)
        let resultado = listado.obtenerRestaurantes(null, null, null);
        expect(resultado.length).to.equal(3);
    })
    it('Dado un listado con 3 restaurantes, si se busca un horario que no existe no retorna nada', function () {

        let resultado = listado.obtenerRestaurantes(null, null, "33:00");
        expect(resultado).to.be.a('array').that.is.empty;
    })
})

describe('Calcular el precio de una reserva', function () {
    it('calcular el precio de la reserva base', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
        let resultado = reserva1.obtenerPrecioBase();
        expect(resultado).to.equal(2800);
    })
    it('calcular el precio final', function () {
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
        let resultado = reserva2.calcularPrecio();
        expect(resultado).to.equal(100);
    })
})