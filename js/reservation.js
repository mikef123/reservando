var Reservation = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

Reservation.prototype.calcularPrecioBaseReserva = function() {
    return this.cantidadPersonas * this.precioPersona;
}

Reservation.prototype.precioFinalReserva = function() {
    let precioBase = this.calcularPrecioBaseReserva();

    precioBase = CalcularDescuentos(this.cantidadPersonas, precioBase, this.codigoDescuento, this.precioPersona);

    precioBase = CalcularAdiciones(this.horario, precioBase);

    return precioBase;
}

function CalcularAdiciones(horario, precioBase) {
    precioBase = adicionalporHorario(horario, precioBase);
    precioBase = adicionalPorFinDeSemana(horario, precioBase);
    return precioBase;
}

function CalcularDescuentos(cantidadPersonas, precioBase, codigoDescuento, precioPersona) {
    precioBase = descuentoPorPersona(cantidadPersonas, precioBase);
    precioBase = descuentoPorCodigo(codigoDescuento, precioBase, precioPersona);
    return precioBase;
}

// Método que valida el excedente que se aplica por ser fin de semana.
function adicionalPorFinDeSemana(horario, precioBase) {
    const dia = horario.getDay()
    if (dia === 4 || dia === 5 || dia === 6) {
        precioBase += calcularPorcentaje(precioBase, 10);
    }
    return precioBase;
}

// Método que valida el excedente que se aplica por horario.
function adicionalporHorario(horario, precioBase) {
    const dia = horario.getDate();
    if (dia == 13 || dia == 14 ||
        dia == 20 || dia == 21) {
        precioBase += calcularPorcentaje(precioBase, 5);
    }
    return precioBase;
}

// Método que valida el descuento que se aplica por código.
function descuentoPorCodigo(codigoDescuento, precioBase, precioPersona) {
    if (codigoDescuento == 'DES15') {
        precioBase -= calcularPorcentaje(precioBase, 15);
    } else if (codigoDescuento == 'DES200') {
        precioBase -= 200;
    } else if (codigoDescuento == 'DES1') {
        precioBase -= precioPersona;
    }
    return precioBase;
}

// Método que valida el descuento que se aplica por persona.
function descuentoPorPersona(cantidadPersonas, precioBase) {
    if (4 < cantidadPersonas && cantidadPersonas < 6) {
        precioBase -= calcularPorcentaje(precioBase, 5);
    } else if (7 == cantidadPersonas || cantidadPersonas == 8) {
        precioBase -= calcularPorcentaje(precioBase, 10);
    } else if (8 < cantidadPersonas) {
        precioBase -= calcularPorcentaje(precioBase, 15);
    }
    return precioBase;
}

// Se calcula el porcentaje a descontar o adicionar.
function calcularPorcentaje(precio, porcetaje) {
    return (precio * porcetaje) / 100
}