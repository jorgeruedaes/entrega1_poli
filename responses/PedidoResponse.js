import Pedido from '../models/Pedido.js';

export default class PedidoResponse {
  constructor(data) {
    this.pedidos = (data || []).map(p => new Pedido(p));
  }

  tieneDatos() {
    return this.pedidos.length > 0;
  }

  getHtml() {
    return this.pedidos.map(p => p.getHtml()).join('');
  }

  getItemsLista() {
    return this.pedidos.map(p => p.getItemLista());
  }
}