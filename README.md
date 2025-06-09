# Kanban Project Manager

Hola! Soy Marco, desarrollador front-end apasionado por crear aplicaciones web intuitivas y responsivas. Este proyecto es una iniciativa personal que busca mostrar mis habilidades prácticas en desarrollo front-end moderno, enfocándome en funcionalidades reales que buscan los reclutadores y equipos técnicos.

### 🧩 Sobre el Proyecto

**Kanban Project Manager** es una aplicación funcional de gestión de tareas estilo Kanban. La desarrollé desde cero utilizando React, TypeScript, Zustand y diversas librerías modernas para gestionar drag-and-drop, estado, theming y validación de formularios. Es tanto un reto técnico como una pieza clave de mi portafolio.

### 🖼️ Captura de pantalla

![Dashboard](./screenshots/dashboard.png)
![New Project](./screenshots/newProject.png)
![Task Dialog](./screenshots/task.png)
![New Task](./screenshots/newTask.png)

### 🔍 Funcionalidades Clave

* Movimiento de tareas con drag-and-drop (`@dnd-kit/core`)
* Gestión de estado global predecible (Zustand)
* Tema claro/oscuro con `next-themes`
* Formularios validados con React Hook Form + Zod
* Componentes de UI estilizados con Chakra UI
* Diseño adaptable a dispositivos móviles
* Enrutamiento con React Router v7
* Iconografía moderna con Lucide y React Icons

### 🛠️ Tecnologías Utilizadas

* **React 19**, **TypeScript**, **Vite**
* **Zustand** para manejo de estado global
* **@dnd-kit** para lógica de arrastrar y soltar
* **Chakra UI** + **Emotion** para los estilos
* **React Hook Form** + **Zod** para validaciones
* **next-themes** para theming
* **ESLint** para mantener calidad de código

### 📦 Cómo Ejecutarlo Localmente

```bash
git clone https://github.com/Marco90v/kanban-project-manager.git
cd kanban-project-manager
npm install
npm run dev
```

Otros comandos:

```bash
npm run lint     # Verifica calidad del código
npm run build    # Compilación para producción
npm run preview  # Previsualiza la app compilada
```

### 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── pages/           # Paginas
├── types/           # Tipos de datos
├── store/           # Estado global con Zustand
├── schema/          # Esquemas de validación
└── utils/           # Validaciones y funciones de utilidad
```

### 🎯 Por Qué Hice Este Proyecto

Quería retarme a mí mismo con una aplicación realista que integrara:

* Diseño de UI accesible
* Arquitectura modular y escalable
* Interacciones avanzadas (drag-and-drop)
* Formularios con tipado seguro
* Flujo de desarrollo completo: build, lint, preview, dev

Mi meta es demostrar que puedo tomar una idea, estructurarla, escribir código limpio y entregar una solución de principio a fin.

### 📬 Contáctame

* Portafolio: [marcovelasquezfigarella.netlify.app](https://marcovelasquezfigarella.netlify.app/)
* LinkedIn: [linkedin.com/in/marco90v](https://linkedin.com/in/marco90v)
