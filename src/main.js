import timeline from './pages/timeline.js'
import login from './pages/login.js'
import register from './pages/register.js'

import { configureLogin, removeLogin } from './lib/index.js';

const container = document.querySelector('#root');

// SINGLE PAGE APLICATION
const init = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
      case ' ':
        container.appendChild(login());
        break;
      case '#register':
        container.appendChild(register());
        break;
      case '#timeline':
        container.appendChild(timeline());
        break;
      default:
        container.appendChild(login());
    }
  });
};

// FUNÇÃO PARA ABRIR O SITE SEMPRE NO CADASTRO E VERIFICAR SE TEVE MUDANÇA NA #
window.addEventListener('load', () => {
  container.appendChild(login());
  init();

  // VARIAVEIS
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');
  const newUser = document.getElementById('nonUser');
  const signInButton = document.getElementById('signin-button');
  const signUpButton = document.getElementById('signup-button');
  const signUpButtonRegister = document.getElementById('signup-button-register');
  const signOutButton = document.getElementById('signout-button');
  const gobackButton = document.getElementById('gobackButton');
  const firebaseSection = document.getElementById('firebaseui-auth-container');

  // LOGIN DE USUARIOS EXISTENTES POR EMAIL E SENHA
  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`descobrir oq é ${user}`);
        window.location.hash = 'timeline'; // ir para o feed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        newUser.innerHTML = ('Não há registro de usuário correspondente a este Email');
        console.log(`descobrir oq é ${errorCode} e ${errorMessage}`);
      });
  });

  // BOTÃO PARA MUDAR PARA A PAGINA DE CADASTRO APÓS O CARREGAMENTO DA PAGINA
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'register'; // ir para pagina cadastro
    firebaseSection.innerHTML = ' ';
  });

  // INPUTS PARA CADASTRO
  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funcionou');

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        if(password === passwordConfirm) {
          const user = userCredential.user;
          window.location.hash = 'timeline';
          console.log('senhas corretas', name + user);
        }
    })
      .catch((error) => {
        newUser.innerHTML = error.message;
        console.log('deu ruim');
      });
  });

  // BOTÃO DE VOLTAR PARA PÁGINA DE LOGIN
  gobackButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('funcionou button img');
        window.history.back();
  });

});

// Iniciando o firebase
document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#root');

  try {
    firebase.app();
    configureLogin();
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        removeLogin();
      }
    });

  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
});
















