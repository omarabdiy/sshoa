const databaseUrl = 'https://home-d1c03-default-rtdb.europe-west1.firebasedatabase.app//users.json'; // Modifica con l'URL del tuo Firebase Realtime Database

// Funzione per registrare un nuovo utente
document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  const nome = document.getElementById('reg-nome').value;
  const cognome = document.getElementById('reg-cognome').value;
  const password = document.getElementById('reg-password').value;

  const user = { nome, cognome, password };

  const response = await fetch(databaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    document.getElementById('register-message').textContent = 'Registrazione completata con successo!';
    document.getElementById('register-message').style.color = 'green';
  } else {
    document.getElementById('register-message').textContent = 'Errore nella registrazione. Riprova.';
    document.getElementById('register-message').style.color = 'red';
  }
});

// Funzione per il login
document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  const nome = document.getElementById('login-nome').value;
  const cognome = document.getElementById('login-cognome').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(databaseUrl);
  const data = await response.json();

  let userFound = false;

  for (const key in data) {
    if (data[key].nome === nome && data[key].cognome === cognome && data[key].password === password) {
      userFound = true;
      break;
    }
  }

  const messageElement = document.getElementById('login-message');

  if (userFound) {
    messageElement.textContent = 'Login riuscito!';
    messageElement.style.color = 'green';
  } else {
    messageElement.textContent = 'Credenziali errate. Riprova.';
    messageElement.style.color = 'red';
  }
});
