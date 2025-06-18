import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	server: {
		host: true,
		port: 3000,
	},
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'sobre-nosotros': resolve(__dirname, 'sobre-nosotros.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        resultados: resolve(__dirname, 'resultados.html'),
        servicios: resolve(__dirname, 'servicios.html'),
      }
    }
  }
})