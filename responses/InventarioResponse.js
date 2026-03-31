export default class InventarioResponse {
  constructor(data) {
    this.stock = data.stock;
  }

  getTexto() {
    return `Stock: ${this.stock}`;
  }

  getMensajeLista(id) {
    return `Inventario producto ${id}: ${this.stock}`;
  }

  getMensajeExito() {
    return `Stock actual: ${this.stock}`;
  }
}