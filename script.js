// Función para encriptar en SHA-256
async function encriptar() {
    const password = document.getElementById('password').value;
    const hash = await sha256(password);
    document.getElementById('hashResult').innerText = 'Hash: ' + hash;
}

// Función para desencriptar (fuerza bruta) con una wordlist
async function desencriptar() {
    const fileInput = document.getElementById('wordlist');
    const hashAlmacenado = document.getElementById('hashResult').innerText.split('Hash: ')[1];

    if (!hashAlmacenado) {
        document.getElementById('decryptResult').innerText = 'Primero debes generar un hash.';
        return;
    }

    if (!fileInput.files.length) {
        document.getElementById('decryptResult').innerText = 'Por favor, carga una wordlist.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function(event) {
        const lines = event.target.result.split('\n'); // Dividimos el archivo en líneas
        for (let i = 0; i < lines.length; i++) {
            const password = lines[i].trim(); // Quitamos los espacios en blanco
            const hash = await sha256(password);
            if (hash === hashAlmacenado) {
                document.getElementById('decryptResult').innerText = '¡Contraseña encontrada!: ' + password;
                return;
            }
        }
        document.getElementById('decryptResult').innerText = 'No se encontró ninguna coincidencia en la wordlist.';
    };

    reader.readAsText(file);
}

// Función para generar el hash en SHA-256
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
