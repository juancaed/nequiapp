import telebot
import requests
import time

TOKEN = "7669760908:AAFpRpQVlvJbSmignQoO1SwPuyoxsHL_i2c"
bot = telebot.TeleBot(TOKEN)

SERVER_URL = "http://localhost:3000/setPage"

@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, "¡Hola! Usa /show para cambiar de página.")

@bot.message_handler(commands=["show"])
def cambiar_pagina(message):
    try:
        PAGINAS_VALIDAS = [""]
        # Verificar si hay suficientes argumentos
        if len(message.text.split()) < 2:
            bot.reply_to(message, "⚠️ Uso correcto: /show pag1|pag2|pag3|pag4")
            return
        
        pagina = message.text.split()[1]
        if pagina in ["pag1", "pag2", "pag3", "pag4"]:
            # Añadir un pequeño retraso antes de enviar
            time.sleep(1)
            requests.post(SERVER_URL, json={"pagina": pagina})
            bot.reply_to(message, f"✅ Página cambiada a {pagina}")
        else:
            bot.reply_to(message, "⚠️ Página inválida. Usa: /show pag1|pag2|pag3|pag4")
    except Exception as e:
        bot.reply_to(message, f"❌ Ocurrió un error: {str(e)}")

print("Bot iniciado. Presiona Ctrl+C para detener.")
bot.polling()