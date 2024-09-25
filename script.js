// Función para encriptar en SHA-256
async function encriptar() {
    const password = document.getElementById('password').value;
    const hash = await sha256(password);
    document.getElementById('hashResult').innerText = 'Hash: ' + hash;
}

// Función para verificar si la contraseña coincide con el hash generado
async function verificar() {
    const passwordVerificar = document.getElementById('passwordVerificar').value;
    const hashAlmacenado = document.getElementById('hashResult').innerText.split('Hash: ')[1];

    if (!hashAlmacenado) {
        document.getElementById('verifyResult').innerText = 'Primero debes generar un hash.';
        return;
    }

    const hashVerificar = await sha256(passwordVerificar);

    if (hashVerificar === hashAlmacenado) {
        document.getElementById('verifyResult').innerText = 'La contraseña es correcta.';
    } else {
        document.getElementById('verifyResult').innerText = 'La contraseña es incorrecta.';
    }
}

// Función para generar el hash en SHA-256
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
