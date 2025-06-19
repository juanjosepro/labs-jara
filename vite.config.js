import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path'

function readHtmlContent(filePath) {
  return fs.readFileSync(path.resolve(filePath), 'utf-8')
}
// Es necesario para que cada pagina pueda aceptar en contenido de los parciales <%- headerContent %>, ...
const pagesConfig = [
  'index.html',
  'resultados.html',
  'contacto.html',
  'servicios.html',
  'sobre-nosotros.html',
  'mision-y-vision.html'
]

// Genera automáticamente las páginas
function generatePages() {
  return pagesConfig.map(filename => ({
    filename: filename,
    template: filename,
    injectOptions: {
      data: {
        headerContent: readHtmlContent('src/partials/header.html'),
        footerContent: readHtmlContent('src/partials/footer.html')
      }
    }
  }))
}

export default defineConfig({
	server: {
		host: true,
		port: 3000,
	},
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: generatePages()
    })
  ],
  build: {
    rollupOptions: {
      // necesario para static sites se debe definir siempre cada página
      input: {
        main: resolve(__dirname, 'index.html'),
        'sobre-nosotros': resolve(__dirname, 'sobre-nosotros.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        resultados: resolve(__dirname, 'resultados.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        'mision-y-vision': resolve(__dirname, 'mision-y-vision.html'),
      }
    }
  },
})