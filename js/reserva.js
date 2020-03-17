var Reserva = function(fecha, cantidadPersonas, precioPorPersona, codigoDescuento) {
    this.fecha = fecha;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.obtenerPrecioBase = function() {
    return this.precioPorPersona * this.cantidadPersonas;
}

Reserva.prototype.calcularPrecio = function() {
    return this.obtenerPrecioBase() + this.adicionalHorario() + this.adicionalFinDeSemana() - this.descuentoPorCodigo() - this.descuentoPorGruposGrandes();
}

Reserva.prototype.precioFinalReserva = function() {
    var preciofinal = CalcularDescuentos();
    precioBase = CalcularAdiciones(preciofinal);

    return precioBase;
}

Reserva.prototype.adicionalHorario = function() {
    if (this.fecha.getHours() === 13 || this.fecha.getHours() === 14 || this.fecha.getHours() === 20 || this.fecha.getHours() === 21) {
        return 0.05 * this.obtenerPrecioBase();
    } else {
        return 0;
    }
}

Reserva.prototype.adicionalFinDeSemana = function() {
    if (this.fecha.getDay() === 5 || this.fecha.getDay() === 6 || this.fecha.getDay() === 0) {
        return 0.1 * this.obtenerPrecioBase();
    } else {
        return 0;
    }
}

// Método que valida el descuento que se aplica por código.
Reserva.prototype.descuentoPorCodigo = function() {
    if (this.codigoDescuento == 'DES15') {
        return (this.obtenerPrecioBase() * 0.15);
    } else if (this.codigoDescuento == 'DES200') {
        return 200;
    } else if (this.codigoDescuento == 'DES1') {
        return this.precioPorPersona;
    }
    else{
        return 0
    }
}

// Método que valida el descuento que se aplica por persona.
Reserva.prototype.descuentoPorGruposGrandes = function() {
    if (4 < this.cantidadPersonas && this.cantidadPersonas < 6) {
        return this.obtenerPrecioBase() * 0.05;
    } else if (7 == this.cantidadPersonas || this.cantidadPersonas == 8) {
        return this.obtenerPrecioBase() * 0.10;
    } else if (8 < this.cantidadPersonas) {
        return this.obtenerPrecioBase() * 0.15;
    }
    else{
        return 0;
    }
}
