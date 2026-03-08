// === КОНФИГУРАЦИЯ ===
const BUDGET_LIMIT = 50000;
let cart = [];
let currentProduct = null;

// === ДАННЫЕ О ПОДАРКАХ (9 штук) ===
// ТЫ МОЖЕШЬ ИЗМЕНИТЬ ЭТИ ДАННЫЕ ПОД СЕБЯ
const products = [
    { id: 1, name: "Парфюм", price: 15000, desc: "Твой любимый аромат, который сводит меня с ума", img: "img/placeholder.png", size: "large" },
    { id: 2, name: "Ужин в ресторане", price: 10000, desc: "Романтический вечер только для нас двоих", img: "img/placeholder.png", size: "medium" },
    { id: 3, name: "Сертификат в SPA", price: 8000, desc: "День расслабления и заботы о себе", img: "img/placeholder.png", size: "small" },
    { id: 4, name: "Ювелирное украшение", price: 20000, desc: "Чтобы ты сияла ещё ярче", img: "img/placeholder.png", size: "large" },
    { id: 5, name: "Выходной от забот", price: 5000, desc: "Я беру все дела на себя, ты отдыхаешь", img: "img/placeholder.png", size: "small" },
    { id: 6, name: "Путешествие на выходные", price: 25000, desc: "Мини-отпуск в новом месте", img: "img/placeholder.png", size: "large" },
    { id: 7, name: "Массаж", price: 6000, desc: "Профессиональный расслабляющий массаж", img: "img/placeholder.png", size: "medium" },
    { id: 8, name: "Корзина цветов", price: 7000, desc: "101 роза или твои любимые цветы", img: "img/placeholder.png", size: "medium" },
    { id: 9, name: "Свидание-сюрприз", price: 12000, desc: "Я всё организую, тебе нужно только прийти", img: "img/placeholder.png", size: "medium" }
];

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
    initWelcomeScreen();
    renderHearts();
    updateBudgetDisplay();
    setupModal();
    setupCart();
});

// === ЭКРАН ПРИВЕТСТВИЯ ===
function initWelcomeScreen() {
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const catalogScreen = document.getElementById('catalog-screen');
    
    startBtn.addEventListener('click', () => {
        welcomeScreen.classList.remove('active');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            catalogScreen.classList.add('active');
        }, 300);
    });
}

// === ГЕНЕРАЦИЯ СЕРДЕЧЕК ===
function renderHearts() {
    const container = document.getElementById('hearts-container');
    container.innerHTML = '';
    
    products.forEach(product => {
        const heart = document.createElement('div');
        heart.className = `heart-item ${product.size}`;
        heart.innerHTML = `<div class="heart-icon">❤️</div>`;
        heart.addEventListener('click', () => openModal(product));
        container.appendChild(heart);
    });
}

// === МОДАЛЬНОЕ ОКНО ===
function setupModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    const addBtn = document.getElementById('add-to-cart-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    addBtn.addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct);
            modal.classList.remove('active');
        }
    });
}

function openModal(product) {
    currentProduct = product;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-desc').textContent = product.desc;
    document.getElementById('modal-price').textContent = product.price;
    document.getElementById('modal-img').src = product.img;
    document.getElementById('product-modal').classList.add('active');
}

// === КОРЗИНА ===
function addToCart(product) {
    const currentTotal = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (currentTotal + product.price > BUDGET_LIMIT) {
        alert('Упс! Это превышает бюджет. Выбери что-то другое или убери лишнее из корзины.');
        return;
    }
    
    cart.push(product);
    updateBudgetDisplay();
    updateCartUI();
    showNotification('Подарок добавлен в корзину! 🎁');
}

function updateBudgetDisplay() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('budget-display').textContent = total;
    document.getElementById('budget-limit').textContent = BUDGET_LIMIT;
}

function updateCartUI() {
    const cartFloating = document.getElementById('cart-floating');
    const cartCount = document.getElementById('cart-count');
    
    cartCount.textContent = cart.length;
    
    if (cart.length > 0) {
        cartFloating.classList.add('active');
    }
}

function setupCart() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    checkoutBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Убрали запрос имени — просто фиксируем
        const name = 'Анна'; // Или её имя
        const comment = prompt('Комментарий к заказу (необязательно):', '');
        
        // URL твоего Google Apps Script
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwokO5p5kFkoQsREY4bMFxTf0CDjhxK8KQi572UBnMAY1wv0vxOlj99qurFT1X4K3Rm/exec';
        
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: cart,
                    total: total,
                    name: name,
                    comment: comment || ''
                })
            });
            
            // Очищаем корзину
            cart = [];
            updateBudgetDisplay();
            updateCartUI();
            document.getElementById('cart-floating').classList.remove('active');
            
            // Показываем успешное сообщение
            alert('Ваш заказ сформирован и будет передан для исполнения в ближайшее время! ❤️');
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, сделай скриншот корзины и отправь мне!');
        }
    });
}

function showNotification(message) {
    // Простое уведомление (можно улучшить)
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        z-index: 2000;
        animation: fadeInOut 2s forwards;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
}