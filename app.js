const lista = document.getElementById('listaDatos');
const PROXY = "https://cors-anywhere.herokuapp.com/";

function agregarLista(texto) {
  const item = document.createElement('li');
  item.className = 'list-group-item';
  item.textContent = texto;
  lista.appendChild(item);
}

async function autorizar() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  const result = document.getElementById('authResult');

  try {
    const response = await fetch('/api/rrhh/autorizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: user, password: pass })
    });

    const data = await response.json();
    result.innerHTML = `<span class="text-success">${data.message}</span>`;
    agregarLista(`RRHH: ${data.message}`);
  } catch {
    result.innerHTML = `<span class="text-danger">Error</span>`;
  }
}

async function consultarStockLocal() {
  const id = document.getElementById('productIdLocal').value;
  const result = document.getElementById('stockLocalResult');

  try {
    const response = await fetch(`/api/bodega/stock/${id}`);
    const data = await response.json();

    result.innerHTML = `Stock: ${data.stock}`;
    agregarLista(`Stock interno producto ${id}: ${data.stock}`);
  } catch {
    result.innerHTML = `Error`;
  }
}

async function consultarInventario() {
  const id = document.getElementById('productIdApi').value;
  const result = document.getElementById('inventarioResult');

  try {
    const response = await fetch(PROXY + `https://polimarket-u9d6.onrender.com/inventario/${id}`);
    const data = await response.json();

    result.innerHTML = `Stock: ${data.stock}`;
    agregarLista(`Inventario producto ${id}: ${data.stock}`);
  } catch {
    result.innerHTML = `Error`;
  }
}

async function actualizarInventario() {
  const id = document.getElementById('productIdApi').value;
  const cantidad = document.getElementById('cantidad').value;
  const result = document.getElementById('inventarioResult');

  try {
    const response = await fetch(PROXY + `https://polimarket-u9d6.onrender.com/inventario/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: Number(cantidad) })
    });

    const data = await response.json();

    result.innerHTML = `Stock actualizado: ${data.stock}`;
    agregarLista(`Actualizado producto ${id}: ${data.stock}`);
  } catch {
    result.innerHTML = `Error`;
  }
}