const lista = document.getElementById('listaDatos');
const PROXY = "https://cors-anywhere.herokuapp.com/";

class InventarioResponse {
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

class ActualizarInventarioResponse {
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

class PedidoResponse {
  constructor(data) {
    this.pedidos = data;
  }

  tieneDatos() {
    return this.pedidos && this.pedidos.length > 0;
  }

  getHtml() {
    let html = '';

    this.pedidos.forEach(pedido => {
      html += `
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h6 class="mb-2">Pedido #${pedido.id}</h6>
            <p class="mb-1"><strong>Estado:</strong> ${pedido.estado}</p>
            <p class="mb-2"><strong>Total:</strong> $${pedido.total}</p>
            <ul class="list-group">
              ${pedido.detalles.map(d => `
                <li class="list-group-item d-flex justify-content-between">
                  <span>${d.producto_nombre} x${d.cantidad}</span>
                  <span>$${d.subtotal}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    });

    return html;
  }

  getItemsLista() {
    return this.pedidos.map(p => `Pedido ${p.id}: $${p.total}`);
  }
}


function limpiarLista() {
  lista.innerHTML = '';
}

function agregarLista(texto) {
  const item = document.createElement('li');
  item.className = 'list-group-item';
  item.textContent = texto;
  lista.appendChild(item);
}

async function consultarInventario() {
  limpiarLista();

  const id = document.getElementById('productIdApi').value;
  const result = document.getElementById('inventarioResult');

  if (!id) {
    Swal.fire('Validación', 'Debe ingresar el ID del producto', 'warning');
    return;
  }

  try {
    const response = await fetch(PROXY + `https://polimarket-u9d6.onrender.com/inventario/${id}`);

    if (!response.ok) throw new Error('No se pudo consultar el inventario');

    const data = await response.json();
    const res = new InventarioResponse(data);

    result.innerHTML = res.getTexto();
    agregarLista(res.getMensajeLista(id));

    Swal.fire('Consulta exitosa', res.getMensajeExito(), 'success');
  } catch (e) {
    result.innerHTML = `Error`;
    Swal.fire('Error', e.message || 'No hubo respuesta del servidor', 'error');
  }
}

async function actualizarInventario() {
  limpiarLista();

  const id = document.getElementById('productIdApi').value;
  const cantidad = document.getElementById('cantidad').value;
  const result = document.getElementById('inventarioResult');

  if (!id) {
    Swal.fire('Validación', 'Debe ingresar el ID del producto', 'warning');
    return;
  }

  if (!cantidad || isNaN(cantidad)) {
    Swal.fire('Validación', 'Debe ingresar una cantidad válida', 'warning');
    return;
  }

  try {
    const response = await fetch(PROXY + `https://polimarket-u9d6.onrender.com/inventario/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: Number(cantidad) })
    });

    if (!response.ok) throw new Error('No se pudo actualizar el inventario');

    const data = await response.json();
    const res = new ActualizarInventarioResponse(data);

    result.innerHTML = res.getTexto();
    agregarLista(res.getMensajeLista(id));

    Swal.fire('Actualizado', res.getMensajeExito(), 'success');
  } catch (e) {
    result.innerHTML = `Error`;
    Swal.fire('Error', e.message || 'No hubo respuesta del servidor', 'error');
  }
}

async function consultarPedidos() {
  limpiarLista();

  const result = document.getElementById('pedidosResult');

  try {
    const response = await fetch(PROXY + `https://polimarket-u9d6.onrender.com/pedidos`);

    if (!response.ok) throw new Error('No se pudieron obtener los pedidos');

    const data = await response.json();
    const res = new PedidoResponse(data);

    if (!res.tieneDatos()) throw new Error('No hay pedidos disponibles');

    result.innerHTML = res.getHtml();

    res.getItemsLista().forEach(item => agregarLista(item));

    Swal.fire('Consulta exitosa', 'Pedidos cargados correctamente', 'success');
  } catch (e) {
    result.innerHTML = `Error`;
    Swal.fire('Error', e.message || 'No hubo respuesta del servidor', 'error');
  }
}