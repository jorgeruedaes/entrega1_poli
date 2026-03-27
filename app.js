async function autorizar() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  const result = document.getElementById('authResult');

  try {
    const response = await fetch('/api/rrhh/autorizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: user,
        password: pass
      })
    });

    const data = await response.json();
    result.innerHTML = `<span class="text-success">${data.message}</span>`;
  } catch (error) {
    result.innerHTML = `<span class="text-danger">Error en la solicitud</span>`;
  }
}

async function consultarStock() {
  const id = document.getElementById('productId').value;
  const result = document.getElementById('stockResult');

  try {
    const response = await fetch(`/api/bodega/stock/${id}`);
    const data = await response.json();

    result.innerHTML = `<span class="text-primary">Stock: ${data.stock}</span>`;
  } catch (error) {
    result.innerHTML = `<span class="text-danger">Error en la consulta</span>`;
  }
}