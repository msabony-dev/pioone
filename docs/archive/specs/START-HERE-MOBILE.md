# PioOne V28.1 full source — Mobile-ready UI

Extract the ZIP preserving the `app/webui` folder.

```sh
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Open `http://localhost:5220` on your computer. To test on a phone, run Vite with an approved LAN binding and use the computer's local IP on the same network. Do not expose the development server directly to the Internet.

The mobile interface activates at browser widths up to 900px. It uses a hamburger navigation drawer and a bottom navigation bar. See `docs/PIOONE-V28-MOBILE-RESPONSIVE.md` for the device test checklist and limitations.
