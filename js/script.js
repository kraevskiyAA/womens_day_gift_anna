// === КОНФИГУРАЦИЯ ===
const BUDGET_LIMIT = 50000;
let cart = [];
let currentProduct = null;

// === ДАННЫЕ О ПОДАРКАХ (9 штук) ===
// ТЫ МОЖЕШЬ ИЗМЕНИТЬ ЭТИ ДАННЫЕ ПОД СЕБЯ
// === ДАННЫЕ О ПОДАРКАХ ===
const products = [
    {
        id: 1,
        name: "🧖 Сертификат на массаж",
        price: 5000,
        desc: "Погрузись в мир наслаждения и расслабления с авторским массажем от начинающего, но очень амбициозного массажиста (меня). В сертификат входят: 45-минутный нежный массаж головы, 45-минутный спортивный массаж после тренировки, 45-минутный страстный ролевой массаж, 45-минутный массаж кистей и стоп. Все массажи сопровождаются тематической музыкой, а также восторженными отзывами о Вашей красоте. Спешите! Предложение ограничено!",
        img: "img/massage.jpg",
        category: "relax"
    },
    {
        id: 2,
        name: "🚗 Обучение на права",
        price: 30000,
        desc: "Обучение вождению - кропотливая и длительная работа. Как хорошо, что Вам не нужно об этом думать! На этом пути Вас будет сопровождать не вполне осознанный, но очень эмпатичный компаньон, который не только будет учить с Вами билеты, но и поддерживать на всём протяжении обучения. В услугу уже включено приобретение обучения в одной из Автошкол г. Москвы.",
        img: "img/driving.jpg",
        category: "education"
    },
    {
        id: 3,
        name: "👨‍🍳 Авторский ужин",
        price: 7000,
        desc: "\"Пусть кинет в меня камень тот, кто не любит вкусно покушать\". В вашем расположении будет никому неизвестный, но очень талантливый шеф, который в течение 2 часов приготовит вам курс из 3 блюд, погрузив в гастрономическое путешествие по кухням мира. Пожалуйста, сообщите о ваших вкусовых предпочтениях заранее.",
        img: "img/dinner.jpg",
        category: "food"
    },
    {
        id: 4,
        name: "✈️ Путешествие на 2 дня",
        price: 15000,
        desc: "Давно мечтали побывать за пределами МКАД-а? (Южное Бутово и Подольск не в счет). Только сейчас вы можете получить двухдневную экскурсию по городам ближайшего Подмосковья с лучшим гидом по ул. Артюхиной! С Вами предварительно свяжутся, согласуют дату и место, а также обеспечат все необходимые условия для комфортного времяпрепровождения!",
        img: "img/travel.jpg",
        category: "travel"
    },
    {
        id: 5,
        name: "🐴 Конная прогулка",
        price: 15000,
        desc: "Вы любите лошадей также, как люблю я? Вопрос философский, ведь я никогда в жизни на них не катался. Незабываемый и (надеюсь) умопомрачительный experience прогулки по весенней Мособласти на непарнокопытном млекопитающем только сегодня и только сейчас!",
        img: "img/horse.jpg",
        category: "adventure"
    },
    {
        id: 6,
        name: "📚 Книжный клуб",
        price: 8000,
        desc: "Давно мечтали погрузиться в чтение, но одной было скучно? Уникальная возможность выбрать 2 книги, которые будут синхронно прочитаны и обсуждены с малоизвестным литературным критиком весьма претенциозных взглядов. В программе также предполагается небольшая мини-лекция о писателе и истории создания манускрипта.",
        img: "img/books.jpg",
        category: "culture"
    },
    {
        id: 7,
        name: "🎁 Секретный подарок",
        price: 13000,
        desc: "Лутбоксы - наше всё. Я, сказать по правде, и сам пока не знаю, что здесь может быть, но ты определенно будешь удивлена, ведь я подключу все свои извилины, чтобы удивить тебя! Попробуй удачу на вкус, дерзай выбрать именно этот вариант!",
        img: "img/secret.jpg",
        category: "mystery"
    },
    {
        id: 8,
        name: "💆 SPA-day",
        price: 12000,
        desc: "Как приятно бывает забыть на денёк о своих делах и расслабиться, доверив заботу о себе настоящим профессионалам! Предлагаю тебе посетить комплекс спа-процедур, после которых ты точно станешь чувствовать себя любимой девушкой!",
        img: "img/spa.jpg",
        category: "relax"
    }
];

// === ФОНОВЫЕ СЕРДЕЧКИ ===
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💘'];
    
    // Создаём 20 плавающих сердечек
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Случайная позиция по горизонтали (0-100%)
        heart.style.left = Math.random() * 100 + '%';
        
        // Случайная начальная позиция по вертикали (0-100%)
        heart.style.top = Math.random() * 100 + '%';
        
        // Случайная длительность анимации (15-25 секунд)
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Случайная задержка
        heart.style.animationDelay = Math.random() * 15 + 's';
        
        // Случайный размер (от 1.5rem до 3rem)
        heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        
        container.appendChild(heart);
    }
}

// === ФУНКЦИЯ РАЗМЕРА СЕРДЕЧКА ПО ЦЕНЕ ===
function getHeartSizeByPrice(price) {
    if (price <= 8000) return 'small';      // 5000-7000
    if (price <= 16000) return 'medium';    // 8000-12000
    return 'large';                         // 13000+
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
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
        const sizeClass = getHeartSizeByPrice(product.price);
        
        heart.className = `heart-item ${sizeClass}`;
        heart.innerHTML = `
            <div class="heart-icon">❤️</div>
            <span class="heart-price">${product.price.toLocaleString('ru-RU')} 💰</span>
        `;
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
    document.getElementById('modal-price-value').textContent = product.price.toLocaleString('ru-RU');
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
    
    // Добавляем клик для открытия корзины
    cartFloating.addEventListener('click', (e) => {
        if (e.target.id !== 'checkout-btn') {
            openCart();
        }
    });
}

// === ОТКРЫТИЕ КОРЗИНЫ ===
function openCart() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items-container');
    const totalAmount = document.getElementById('cart-total-amount');
    const budgetLeftAmount = document.getElementById('cart-budget-left-amount');
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <div class="cart-empty-text">Корзина пуста.<br>Добавь подарки из каталога!</div>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('ru-RU')} 💰</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
            `;
            container.appendChild(cartItem);
        });
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const budgetLeft = BUDGET_LIMIT - total;
    
    totalAmount.textContent = `${total.toLocaleString('ru-RU')} 💰`;
    budgetLeftAmount.textContent = `${budgetLeft.toLocaleString('ru-RU')} 💰`;
    
    modal.classList.add('active');
}

// === УДАЛЕНИЕ ИЗ КОРЗИНЫ ===
function removeFromCart(index) {
    cart.splice(index, 1);
    updateBudgetDisplay();
    updateCartUI();
    openCart(); // Перерисовать корзину
    
    if (cart.length === 0) {
        document.getElementById('cart-floating').classList.remove('active');
    }
    
    showNotification('Подарок удалён из корзины 🗑️');
}

// === ЗАКРЫТИЕ КОРЗИНЫ ===
function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

function setupCart() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutFromCartBtn = document.getElementById('checkout-from-cart-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const closeCartModal = document.getElementById('close-cart-modal');
    
    // Оформление из плавающей корзины
    checkoutBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не открывалась корзина
        openCart();
    });
    
    // Оформление из модального окна корзины
    checkoutFromCartBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const name = 'Анна';
        const comment = prompt('Комментарий к заказу (необязательно):', '');
        
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
            
            cart = [];
            updateBudgetDisplay();
            updateCartUI();
            closeCart();
            document.getElementById('cart-floating').classList.remove('active');
            
            alert('Ваш заказ сформирован и будет передан для исполнения в ближайшее время! ❤️');
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, сделай скриншот корзины и отправь мне!');
        }
    });
    
    // Продолжить выбор
    continueShoppingBtn.addEventListener('click', () => {
        closeCart();
    });
    
    // Закрытие по крестику
    closeCartModal.addEventListener('click', () => {
        closeCart();
    });
    
    // Закрытие по клику вне окна
    document.getElementById('cart-modal').addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') {
            closeCart();
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