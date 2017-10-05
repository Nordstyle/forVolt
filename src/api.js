export const createUser = (name, phone, address) =>
  fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, phone, address })
  })
