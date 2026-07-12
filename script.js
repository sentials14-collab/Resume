// ==================== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Загрузка сохранённой темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ==================== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const targetId = href.startsWith('#') ? href.substring(1) : href;

        if (targetId === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ==================== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== КНОПКА СКАЧАТЬ РЕЗЮМЕ (РАБОЧАЯ) ====================
const downloadBtn = document.getElementById('download-resume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Создаём виртуальную ссылку для скачивания
        const link = document.createElement('a');
        link.href = 'assets/Nazar_Karpenko_Resume.pdf'; // путь к файлу
        link.download = 'Nazar_Karpenko_Resume.pdf'; // имя файла при скачивании
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Если файла нет - показываем сообщение
        setTimeout(() => {
            alert('Если файл не скачался, проверьте наличие файла в папке assets/');
        }, 1000);
    });
}

// ==================== АНИМАЦИЯ БУКВ В ЗАГОЛОВКЕ ====================
const title = document.querySelector('.hero-content h1');
if (title) {
    const text = title.textContent;
    title.innerHTML = '';

    [...text].forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${index * 0.05}s`;
        span.classList.add('letter-animation');
        title.appendChild(span);
    });
}

// ==================== АНИМАЦИИ ПРИ СКРОЛЛЕ ====================
const scrollObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            if (element.dataset.animation) {
                element.classList.add(element.dataset.animation);
            } else {
                element.classList.add('fade-in-up');
            }

            if (element.dataset.delay) {
                element.style.transitionDelay = `${element.dataset.delay}s`;
            }

            scrollObserver.unobserve(element);
        }
    });
}, scrollObserverOptions);

// Наблюдаем за всеми основными блоками
document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('will-animate');
    scrollObserver.observe(section);
});

document.querySelectorAll('.section-title').forEach((title, index) => {
    title.dataset.animation = 'fade-in-down';
    title.dataset.delay = index * 0.1;
    scrollObserver.observe(title);
});

document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.dataset.animation = 'slide-in-right';
    item.dataset.delay = index * 0.1;
    scrollObserver.observe(item);
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.dataset.animation = 'zoom-in';
    card.dataset.delay = index * 0.15;
    scrollObserver.observe(card);
});

document.querySelectorAll('.experience-card').forEach((item, index) => {
    item.dataset.animation = 'slide-in-left';
    item.dataset.delay = index * 0.2;
    scrollObserver.observe(item);
});

document.querySelectorAll('.contact-info li, .contact-form input, .contact-form textarea').forEach((el, index) => {
    el.dataset.animation = 'fade-in-scale';
    el.dataset.delay = index * 0.05;
    scrollObserver.observe(el);
});

document.querySelectorAll('.btn').forEach((btn, index) => {
    btn.dataset.animation = 'pulse-once';
    scrollObserver.observe(btn);
});

// ==================== ПАРАЛЛАКС ЭФФЕКТ ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }

    const photo = document.querySelector('.photo-placeholder');
    if (photo) {
        photo.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ==================== АНИМАЦИЯ ПРОГРЕСС-БАРОВ ====================
function animateProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)';
            bar.style.width = width;
        }, 300);
    });
}

window.addEventListener('load', animateProgressBars);

// ==================== АНИМАЦИЯ ЦИФР В НАВЫКАХ ====================
function animateNumbers() {
    document.querySelectorAll('.skill-percent').forEach(el => {
        const text = el.textContent;
        const number = parseInt(text);

        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    el.textContent = text;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.round(current) + '%';
                }
            }, 20);
        }
    });
}

window.addEventListener('load', () => {
    setTimeout(animateNumbers, 1000);
});

// ==================== 3D ЭФФЕКТ ДЛЯ КАРТОЧЕК ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

        const icon = card.querySelector('.project-image i');
        if (icon) {
            icon.style.transform = `translateZ(30px) rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

        const icon = card.querySelector('.project-image i');
        if (icon) {
            icon.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        }
    });
});

// ==================== 3D ЭФФЕКТ ДЛЯ ФОТО ====================
const photo = document.querySelector('.photo-placeholder');
if (photo) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        photo.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) translateZ(20px)`;
    });

    document.addEventListener('mouseleave', () => {
        photo.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    });
}

// ==================== ОТПРАВКА ФОРМЫ ====================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // ⚠️ ЗАМЕНИТЕ НА СВОЙ ENDPOINT FORMSPREE
        const endpoint = 'https://formspree.io/f/xjvqyqpl';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formStatus.innerHTML = '<p style="color: var(--primary);">✅ Сообщение отправлено! Спасибо.</p>';
                contactForm.reset();
            } else {
                const errorData = await response.json();
                let errorMsg = errorData.error || 'Ошибка при отправке';
                if (response.status === 404) {
                    errorMsg = 'Form not found: проверьте endpoint Formspree.';
                }
                formStatus.innerHTML = `<p style="color: #e74c3c;">❌ ${errorMsg}</p>`;
            }
        } catch (error) {
            formStatus.innerHTML = '<p style="color: #e74c3c;">❌ Проблема с соединением. Проверьте интернет.</p>';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить сообщение';
        }

        // ==================== РАБОТАЮЩИЕ КНОПКИ ПРОЕКТОВ ====================

        // Кнопки личного сайта
        document.getElementById('demo-personal')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Демо-версия личного сайта откроется в новой вкладке');
            // window.open('https://ваш-сайт.com', '_blank');
        });

        document.getElementById('code-personal')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Исходный код проекта на GitHub');
            // window.open('https://github.com/ваш-аккаунт/проект', '_blank');
        });

        // Кнопка Tilda сайта - уже работает через прямую ссылку
        // Дополнительная проверка, если ссылка не указана
        document.getElementById('demo-tilda')?.addEventListener('click', (e) => {
            const link = document.getElementById('demo-tilda').getAttribute('href');
            if (link === '#' || link === 'https://ваш-сайт.tilda.ws') {
                e.preventDefault();
                alert('Укажите реальную ссылку на ваш Tilda-сайт в атрибуте href');
            }
        });

        // Кнопка Figma дизайна
        document.getElementById('design-figma')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Открыть макеты в Figma');
            // window.open('https://figma.com/file/ваш-файл', '_blank');
        });
    });
}