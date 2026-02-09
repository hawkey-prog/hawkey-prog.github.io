// JavaScript для карусели прокрутки
document.addEventListener('DOMContentLoaded', function() {
    // Функция для инициализации карусели
    function initCarousel(containerId, indicatorId, itemWidth = 300) {
        const container = document.getElementById(containerId);
        const indicator = document.getElementById(indicatorId);
        const prevBtn = container.closest('.services-scroll-container').querySelector('.scroll-nav.prev');
        const nextBtn = container.closest('.services-scroll-container').querySelector('.scroll-nav.next');
        
        const items = container.querySelectorAll('.service-item, .process-step');
        const itemCount = items.length;
        const gap = 20;
        const scrollAmount = itemWidth + gap;
        
        // Создаем индикаторы
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
            indicator.querySelectorAll('.scroll-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Обработчики для кнопок
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
    initCarousel('services-scroll', 'services-indicator', 280);
    initCarousel('process-scroll', 'process-indicator', 280);
    
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
                
                if (currentScroll >= maxScroll) {
                    // Возвращаемся к началу
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Прокручиваем дальше
                    container.scrollBy({
                        left: 280,
                        behavior: 'smooth'
                    });
                }
            });
        }, 5000); // Прокрутка каждые 5 секунд
    }
    
    // Останавливаем авто-прокрутку при наведении
    document.querySelectorAll('.services-scroll-wrapper').forEach(container => {
        container.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    });
    
    // Запускаем авто-прокрутку
    // startAutoScroll(); // Раскомментируйте, если нужна автоматическая прокрутка
});
