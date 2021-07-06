<p align="center"><img src="./Minato_Aqua.png" alt="Minato_Aqua" height="400" /></p>
<p>
  <a href="https://azurlane.koumakan.jp/File:Minato_Aqua.png" style="color: gray; font-size: 10px;text-decoration: none">Illustration from Azur Lane Wiki</a>
</p>
<h1 align="center">Aqua ⚓</h1>

<p align="center">
  <a href="https://github.com/Shirajuki/aqua/blob/main/LICENSE" alt="LICENSE">
    <img src="https://img.shields.io/github/license/Shirajuki/aqua" />
  </a>
  <a href="https://github.com/Shirajuki/aqua/issues" alt="Issues">
    <img src="https://img.shields.io/github/issues/Shirajuki/aqua" />
  </a>
</p>

A Work In Progress Touhou, Azur Lane and Harmful Park inspired danmaku JS horizontal scrolling 2D shooting game ⚓

## Built With
- JavaScript / TypeScript
- Svelte framework
- HTML5
- CSS3
- LocalStorage API
- Service Workers (PWA)

<hr />

This is a Progressive Web App (PWA) template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/tretapey/svelte-pwa.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit tretapey/svelte-pwa my-svelte-pwa
cd my-svelte-pwa
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd my-svelte-pwa
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## PWA Configuration

- The `service-worker.js` and `manifest.json` files are in the `public` folder.
- You should update the icons in `/public/images/icons`
- For an offline experience edit the `/public/offline.html` file.
- This PWA is installable. For more information on how to use check [this repo](https://github.com/pwa-builder/pwa-install).
  Note: If you don't want to make the app installable you can remove the script from the `index.html` file in the `public` folder.

For more info, this template was made following this [tutorial](https://codelabs.developers.google.com/codelabs/your-first-pwapp)

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
