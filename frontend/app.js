function fetchProducts() {
    fetch(`${API_BASE_URL}/products`)
        .then(response => response.json())
        .then(products => {
            const list = document.getElementById('productList');
            list.innerHTML = ''; // Clear existing entries
            products.forEach(product => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const descCell = document.createElement('td');
                const priceCell = document.createElement('td');
                const unitsCell = document.createElement('td');  // New
                const statusCell = document.createElement('td'); // New
                // const statusSpan = document.createElement('span');


                nameCell.textContent = product.product_name;
                descCell.textContent = product.description;
                priceCell.textContent = `$${parseFloat(product.price).toFixed(2)}`;
                unitsCell.textContent = product.units;  // Assumes 'units' is part of the product object
                statusCell.textContent = product.status; // Assumes 'status' is part of the product object

                // Apply color based on status
                // statusSpan.className = 'status-box';
                if (product.status === 'Available') {
                    statusCell.classList.add('status-available');
                } else if (product.status === 'Limited') {
                    statusCell.classList.add('status-limited');
                } else if (product.status === 'Out of Stock') {
                    statusCell.classList.add('status-outofstock');
                }

                row.appendChild(nameCell);
                row.appendChild(descCell);
                row.appendChild(priceCell);
                row.appendChild(unitsCell);  // Append new cell
                row.appendChild(statusCell); // Append new cell

                list.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}


document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addProduct();
});

function addProduct() {
    const product_name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const units = document.getElementById('productUnits').value;  // New
    const status = document.getElementById('productStatus').value; // New

    const productData = { product_name, description, price, units, status };

    fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchProducts(); // Refresh the list
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function clearFormFields() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
}

window.onload = fetchProducts;
