import DetallePedido from './DetallePedido.js';

export default class Pedido {
  constructor(data) {
    this.id = data.id;
    this.estado = data.estado;
    this.total = data.total;
    this.detalles = (data.detalles || []).map(d => new DetallePedido(d));
  }

  getHtml() {
    return `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h6 class="mb-2">Pedido #${this.id}</h6>
          <p class="mb-1"><strong>Estado:</strong> ${this.estado}</p>
          <p class="mb-2"><strong>Total:</strong> $${this.total}</p>
          <ul class="list-group">
            ${this.detalles.map(d => d.getHtml()).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  getItemLista() {
    return `Pedido ${this.id}: $${this.total}`;
  }
}