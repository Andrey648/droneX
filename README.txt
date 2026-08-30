DRONEX — NEW LANDING

Файлы:
- index.html — структура сайта
- styles.css — весь визуальный стиль и адаптив
- app.js — Telegram-ссылки и scroll-driven animation

ВАЖНО:
1. Открой app.js.
2. Замени:
   const TELEGRAM_BOT_URL = 'https://t.me/YOUR_DRONEX_BOT';
   на username/ссылку твоего Telegram-бота.

Ссылки уже разделены по start-параметрам:
- whoop
- 5inch
- dronex
- build

Когда в боте будут готовы соответствующие deep-link команды, сайт сможет сразу открывать нужный сценарий.

Для реальных рендеров:
- положить PNG/WebP в assets/
- заменить CSS placeholders внутри index.html на <img>
- оставить data-step, чтобы scroll-анимация продолжила управлять сборкой.
