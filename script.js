function filterMenu() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemCategory = item.getAttribute('data-category');
        
        const matchesSearch = itemName.includes(searchInput);
        const matchesCategory = categoryFilter === 'all' || itemCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function sortMenu() {
    const sortOrder = document.getElementById('sort-order').value;
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));
    const container = document.querySelector('.form-section');

    if (sortOrder === 'price-asc') {
        menuItems.sort((a, b) => 
            parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'))
        );
    } else if (sortOrder === 'price-desc') {
        menuItems.sort((a, b) => 
            parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'))
        );
    }

    menuItems.forEach(item => container.appendChild(item));
    filterMenu();
}

function updateTotal() {
    const menuItems = document.querySelectorAll('.menu-item');
    let total = 0;

    menuItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('input').value) || 0;
        total += price * quantity;
    });

    document.getElementById('total').textContent = total.toLocaleString('vi-VN') + ' VNĐ';
}

function showModal() {
    document.getElementById('customer-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('customer-modal').style.display = 'none';
    document.getElementById('customer-form').reset();
}

function submitOrder() {
    const menuItems = document.querySelectorAll('.menu-item');
    let orderDetails = [];
    let total = 0;

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('input').value) || 0;
        if (quantity > 0) {
            const name = item.querySelector('span').textContent.split(' - ')[0];
            const price = parseFloat(item.getAttribute('data-price'));
            orderDetails.push(`${name} x${quantity} - ${price * quantity} VNĐ`);
            total += price * quantity;
        }
    });

    if (orderDetails.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn!');
        return;
    }

    showModal();
}

document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;

    const menuItems = document.querySelectorAll('.menu-item');
    let orderDetails = [];
    let total = 0;

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('input').value) || 0;
        if (quantity > 0) {
            const itemName = item.querySelector('span').textContent.split(' - ')[0];
            const price = parseFloat(item.getAttribute('data-price'));
            orderDetails.push(`${itemName} x${quantity} - ${price * quantity} VNĐ`);
            total += price * quantity;
        }
    });

    const orderSummary = `Đặt hàng thành công!\n\nThông tin khách hàng:\nHọ và tên: ${name}\nSố điện thoại: ${phone}\nĐịa chỉ: ${address}\n\nĐơn hàng:\n${orderDetails.join('\n')}\n\nTổng tiền: ${total.toLocaleString('vi-VN')} VNĐ`;
    alert(orderSummary);

    closeModal();
    menuItems.forEach(item => item.querySelector('input').value = 0);
    updateTotal();
});

document.addEventListener('DOMContentLoaded', () => {
    updateTotal();
});