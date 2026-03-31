export default class ActualizarInventarioResponse {
  constructor(data) {
    this.stock = data.stock;
  }

  getTexto() {
    return `Stock actualizado: ${this.stock}`;
  }

  getMensajeLista(id) {
    return `Actualizado producto ${id}: ${this.stock}`;
  }

  getMensajeExito() {
    return `Nuevo stock: ${this.stock}`;
  }
}