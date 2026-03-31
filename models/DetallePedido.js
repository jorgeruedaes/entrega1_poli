export default class DetallePedido {
  constructor(data) {
    this.productoNombre = data.producto_nombre;
    this.cantidad = data.cantidad;
    this.subtotal = data.subtotal;
  }

  getHtml() {
    return `
      <li class="list-group-item d-flex justify-content-between">
        <span>${this.productoNombre} x${this.cantidad}</span>
        <span>$${this.subtotal}</span>
      </li>
    `;
  }
}