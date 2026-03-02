function render(products) {
    const container = document.getElementById('productContainer');
    const today = new Date();
    container.innerHTML = "";

    products.forEach(item => {
        const daysUsed = Math.floor((today - new Date(item.startDate)) / (1000 * 60 * 60 * 24));
        let status = daysUsed > 180 ? "danger" : (daysUsed > 90 ? "warn" : "safe");

        container.innerHTML += `
            <div class="product-card ${status}">
                <button class="del-btn" onclick="deleteProduct('${item.id}')">×</button>
                <small>${item.category.toUpperCase()}</small>
                <h3>${item.name}</h3>
                <span class="days-used">${daysUsed} Days</span>
                <p>Started: ${item.startDate}</p>
            </div>
        `;
    });
}

function checkNotifications(products) {
    const oldItems = products.filter(p => {
        const days = Math.floor((new Date() - new Date(p.startDate)) / (1000 * 60 * 60 * 24));
        return days > 180;
    });

    if (oldItems.length > 0) {
        const panel = document.getElementById('notificationArea');
        document.getElementById('notifMessage').innerText = `Caution: ${oldItems.length} product(s) used for over 6 months!`;
        panel.classList.add('show');
    }
}

function closeNotif() {
    document.getElementById('notificationArea').classList.remove('show');
}