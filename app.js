import InventarioResponse from './responses/InventarioResponse.js';
import ActualizarInventarioResponse from './responses/ActualizarInventarioResponse.js';
import PedidoResponse from './responses/PedidoResponse.js';

const lista = document.getElementById('listaDatos');
//const PROXY = "https://cors-anywhere.herokuapp.com/";
const PROXY = "";

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

window.consultarInventario = consultarInventario;
window.actualizarInventario = actualizarInventario;
window.consultarPedidos = consultarPedidos;