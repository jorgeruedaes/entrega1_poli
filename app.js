
const lista = document.getElementById('listaDatos');
const PROXY = "https://cors-anywhere.herokuapp.com/";

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

    result.innerHTML = `Stock: ${data.stock}`;
    agregarLista(`Inventario producto ${id}: ${data.stock}`);

    Swal.fire('Consulta exitosa', `Stock actual: ${data.stock}`, 'success');
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

    result.innerHTML = `Stock actualizado: ${data.stock}`;
    agregarLista(`Actualizado producto ${id}: ${data.stock}`);

    Swal.fire('Actualizado', `Nuevo stock: ${data.stock}`, 'success');
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

    if (!data.length) throw new Error('No hay pedidos disponibles');

    let html = '';

    data.forEach(pedido => {
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
      agregarLista(`Pedido ${pedido.id}: $${pedido.total}`);
    });

    result.innerHTML = html;

    Swal.fire('Consulta exitosa', 'Pedidos cargados correctamente', 'success');
  } catch (e) {
    result.innerHTML = `Error`;
    Swal.fire('Error', e.message || 'No hubo respuesta del servidor', 'error');
  }
}