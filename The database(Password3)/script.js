document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleLogin = document.getElementById('toggleLogin');
    const toggleRegister = document.getElementById('toggleRegister');
    const formTitle = document.getElementById('formTitle');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const registerConfirmPassword = document.getElementById('registerConfirmPassword');
    const showPassword = document.getElementById('showPassword');
    const message = document.getElementById('message');

    // Переключение между формами
    toggleLogin.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        formTitle.textContent = 'Вход';
    });

    toggleRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        formTitle.textContent = 'Регистрация';
    });

    // Показать/скрыть пароль
    showPassword.addEventListener('change', () => {
        const type = showPassword.checked ? 'text' : 'password';
        registerPassword.type = type;
        registerConfirmPassword.type = type;
    });

    // Проверка заполненности полей для входа
    const checkLoginFields = () => {
        if (loginEmail.value && loginPassword.value) {
            loginButton.style.backgroundColor = '#28a745';
        } else {
            loginButton.style.backgroundColor = '#dc3545';
        }
    };

    loginEmail.addEventListener('input', checkLoginFields);
    loginPassword.addEventListener('input', checkLoginFields);

    // Проверка заполненности полей для регистрации
    const checkRegisterFields = () => {
        if (registerEmail.value && registerPassword.value && registerConfirmPassword.value) {
            registerButton.style.backgroundColor = '#28a745';
        } else {
            registerButton.style.backgroundColor = '#dc3545';
        }
    };

    registerEmail.addEventListener('input', checkRegisterFields);
    registerPassword.addEventListener('input', checkRegisterFields);
    registerConfirmPassword.addEventListener('input', checkRegisterFields);

    // Обработка формы входа
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u => u.email === email && u.password === password);

        if (user) {
            message.textContent = `Добро пожаловать, ${email}`;
            message.style.color = 'transparent';
            message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
            message.textContent = 'Неверный email или пароль';
            message.style.color = '#dc3545';
            message.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        }
    });

    // Обработка формы регистрации
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = registerEmail.value;
        const password = registerPassword.value;
        const confirmPassword = registerConfirmPassword.value;

        if (password !== confirmPassword) {
            message.textContent = 'Пароли не совпадают';
            message.style.color = '#dc3545';
            message.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(u => u.email === email);

        if (userExists) {
            message.textContent = 'Пользователь с такой почтой уже существует';
            message.style.color = '#dc3545';
            message.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            return;
        }

        storedUsers.push({ email, password });
        localStorage.setItem('users', JSON.stringify(storedUsers));

        message.textContent = `Добро пожаловать, ${email}`;
        message.style.color = 'transparent';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

        // Переключение на форму входа
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        formTitle.textContent = 'Вход';
    });
});