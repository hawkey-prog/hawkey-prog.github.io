// script.js - JavaScript для карусели и других функций
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем год в футере
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Функция для инициализации карусели
    function initCarousel(containerId, indicatorId, itemWidth = 280) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const indicator = document.getElementById(indicatorId);
        const scrollContainer = container.closest('.services-scroll-container');
        const prevBtn = scrollContainer.querySelector('.scroll-nav.prev');
        const nextBtn = scrollContainer.querySelector('.scroll-nav.next');
        
        const items = container.querySelectorAll('.service-item, .process-step');
        const itemCount = items.length;
        const gap = 20;
        const scrollAmount = itemWidth + gap;
        
        // Создаем индикаторы, если они есть
        if (indicator) {
            indicator.innerHTML = '';
            for (let i = 0; i < itemCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', () => {
                    scrollToItem(i);
                });
                indicator.appendChild(dot);
            }
        }
        
        // Функция прокрутки к конкретному элементу
        function scrollToItem(index) {
            container.scrollTo({
                left: index * scrollAmount,
                behavior: 'smooth'
            });
            updateActiveIndicator(index);
        }
        
        // Обновление активного индикатора
        function updateActiveIndicator(index) {
            if (!indicator) return;
            indicator.querySelectorAll('.scroll-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Обработчики для кнопок навигации
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const currentScroll = container.scrollLeft;
                const targetScroll = Math.max(0, currentScroll - scrollAmount);
                const targetIndex = Math.round(targetScroll / scrollAmount);
                
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
                updateActiveIndicator(targetIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const currentScroll = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                const targetScroll = Math.min(maxScroll, currentScroll + scrollAmount);
                const targetIndex = Math.round(targetScroll / scrollAmount);
                
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
                updateActiveIndicator(targetIndex);
            });
        }
        
        // Обработчик события прокрутки
        container.addEventListener('scroll', () => {
            const scrollLeft = container.scrollLeft;
            const activeIndex = Math.round(scrollLeft / scrollAmount);
            updateActiveIndicator(activeIndex);
        });
        
        // Активируем первый индикатор
        updateActiveIndicator(0);
    }
    
    // Инициализируем карусели
    initCarousel('services-scroll', 'services-indicator');
    initCarousel('process-scroll', 'process-indicator');
    
    // Автоматическая прокрутка (опционально)
    let autoScrollInterval;
    
    function startAutoScroll() {
        const containers = ['services-scroll', 'process-scroll'];
        
        autoScrollInterval = setInterval(() => {
            containers.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (!container) return;
                
                const currentScroll = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                if (currentScroll >= maxScroll - 10) {
                    // Возвращаемся к началу
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Прокручиваем дальше
                    container.scrollBy({
                        left: 300,
                        behavior: 'smooth'
                    });
                }
            });
        }, 5000);
    }
    
    // Останавливаем авто-прокрутку при наведении
    document.querySelectorAll('.services-scroll-wrapper').forEach(container => {
        container.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            // startAutoScroll(); // Раскомментируйте для авто-прокрутки
        });
        
        // Touch события для мобильных устройств
        container.addEventListener('touchstart', () => {
            clearInterval(autoScrollInterval);
        });
        
        container.addEventListener('touchend', () => {
            // startAutoScroll(); // Раскомментируйте для авто-прокрутки
        });
    });
    
    // Запускаем авто-прокрутку (раскомментируйте если нужно)
    // startAutoScroll();
});
