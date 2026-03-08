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
    },
    {
        id: 9,
        name: "💝 Что-то особенное",
        price: 10000,
        desc: "Иногда лучшие подарки — те, которые рождаются в моменте. Доверься моей фантазии, и я придумаю что-то уникальное именно для тебя. Это может быть всё что угодно: от пикника на крыше до внезапной поездки за город. Сюрприз гарантирован!",
        img: "img/surprise.jpg",
        category: "surprise"
    }
];

// === ФУНКЦИЯ РАЗМЕРА СЕРДЕЧКА ПО ЦЕНЕ ===
function getHeartSizeByPrice(price) {
    if (price <= 7000) return 'small';      // 5000-7000
    if (price <= 12000) return 'medium';    // 8000-12000
    return 'large';                         // 13000+
}

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