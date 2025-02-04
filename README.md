# El Meu Text d'Opinió 📝

Plataforma web para compartir textos de opinión escritos por estudiantes de 4º y 5º de primaria en Cataluña. Este proyecto forma parte del estudio "Preeemptive interventions for high-efficacy instruction on writing" (PRINT-W), financiado por el Ministerio de Innovación y Ciencia (ref. PID2022-137868NB-I00).

## 🚀 Características

- **Subida Segura**: Validación de imágenes mediante IA para asegurar contenido apropiado
- **Galería Interactiva**: Visualización de textos con búsqueda por pseudónimo y título
- **Interfaz Multilingüe**: Disponible en catalán
- **Diseño Responsivo**: Experiencia óptima en todos los dispositivos
- **Moderación**: Panel de administración para gestión de contenido
- **Seguridad**: Implementación de NSFW.js para detección de contenido inapropiado

## 🛠 Tecnologías

- **Frontend**: React 18 con TypeScript
- **Estilizado**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase (Storage & Firestore)
- **Empaquetador**: Vite
- **Validación**: NSFW.js
- **Iconos**: Lucide React

## 📋 Prerrequisitos

- Node.js 22.10.0
- npm o pnpm (recomendado)

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone [URL_del_repositorio]
cd elmeutextdopinio
```

2. Instalar dependencias:

```bash
npm install
# o
pnpm install
```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Cloudflare Pages. El proceso de despliegue es automático:

1. Realiza tus cambios y haz commit:

```bash
git add .
git commit -m "descripción de los cambios"
git push origin main
```

2. Cloudflare Pages detectará automáticamente los cambios y creará una nueva versión del sitio.

3. Puedes seguir el progreso del despliegue en el dashboard de Cloudflare Pages.

El sitio estará disponible en elmeutextdopinio.cat una vez completado el despliegue.

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes React
├── lib/               # Utilidades y servicios
│   ├── firebase/      # Configuración y servicios de Firebase
│   └── nsfw/          # Validación de contenido
├── App.tsx            # Componente principal
└── main.tsx          # Punto de entrada
```

## 🔒 Seguridad

- Validación de imágenes mediante NSFW.js
- Sin almacenamiento de datos personales
- Moderación de contenido
- Supervisión parental recomendada

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ✨ Agradecimientos

- Ministerio de Innovación y Ciencia
- Investigadora principal: Naymé Salas
- Equipo del proyecto PRINT-W

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

Carlos Villuendas - carlosvillu@gmail.com
