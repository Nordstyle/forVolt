const getJSON = (url) => fetch(url).then(r => r.json());

export const createUser = (name, phone, address) =>
  fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, address })
  })

export const editUser = (id, name, phone, address) =>
  fetch(`/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, address })
  })

export const getUsers = () => getJSON('/api/customers')

export const getUser = (id) => getJSON(`/api/customers/${id}`)

export const deleteUser = (id) => fetch(`/api/customers/${id}`, { method: 'DELETE' })


export const createProduct = (name, price) =>
  fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  })

export const editProduct = (id, name, price) =>
  fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  })

export const getProducts = () => getJSON('/api/products')

export const getProduct = (id) => getJSON(`/api/products/${id}`)

export const deleteProduct = (id) => fetch(`/api/products/${id}`, { method: 'DELETE' })

export const getInvoices = async () => {
  const invoicesList = await getJSON('/api/invoices');
  return await Promise.all(invoicesList.map(async (invoice) => {
    invoice.customer = await getUser(invoice.customer_id)
      .then(customer => customer.name)
      .catch(err => 'Unknown user')
    return invoice
  }))
}

export const getInvoice = (id) => getJSON(`/api/invoices/${id}`)

export const getInvoiceItems = (id) => getJSON(`/api/invoices/${id}/items`)

export const createInvoice = (customer_id, discount, total) =>
  fetch('/api/invoices/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id, discount, total })
  }).then(r => r.json());

export const createInvoiceItem = (invoice_id, product_id, quantity) =>
  fetch(`/api/invoices/${invoice_id}/items`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invoice_id, product_id, quantity })
  })

  export const deleteInvoice = (id) => fetch(`/api/invoices/${id}`, { method: 'DELETE' })
