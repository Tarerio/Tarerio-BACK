# TARERIO - Aplicación de Gestión de Tareas y Agenda para Estudiantes PTVAL

## Descripción del Proyecto

TARERIO es una aplicación backend diseñada para gestionar tareas y agendas de estudiantes del programa PTVAL en el Centro San Rafael. La herramienta permite a los administradores del centro, profesores y alumnos llevar un seguimiento completo de las tareas asignadas, así como gestionar aulas virtuales, peticiones de material, y comunicarse entre ellos mediante chat. Este repositorio contiene la primera iteración del backend, que incluye los modelos de datos, controladores y rutas principales de la aplicación.


## **Resumen del Proyecto: Sistema de Gestión Educativa**

El proyecto tiene como objetivo desarrollar una **plataforma integral de gestión educativa**, orientada a facilitar la administración, seguimiento y comunicación entre administradores, profesores y alumnos. A continuación, se detalla cómo los requisitos funcionales, no funcionales y de información se integran para cumplir con este propósito:

---

### **Módulos Principales**

#### **1. Administrador**
El módulo del administrador ofrece herramientas completas para la gestión del sistema:
- **Gestión de Usuarios:**  
  Permite registrar, modificar, dar de baja y asignar alumnos y profesores a aulas. Además, incluye funcionalidades avanzadas como la visualización de listas con filtros y la gestión segura de contraseñas (cumpliendo con RNF-6).
- **Gestión de Tareas:**  
  Facilita la creación, edición y eliminación de distintos tipos de tareas (petición, juego, por pasos), asignándolas a alumnos y gestionando los materiales asociados. También permite consultar el historial de tareas completadas (RI-9, RI-13).
- **Gestión de Aulas:**  
  El administrador puede crear, modificar y eliminar aulas, asegurando que estas se configuren según los comandos específicos asignados (RI-15, RI-16).
- **Comunicación y Accesibilidad:**  
  Incorpora un chat para interactuar con alumnos y la capacidad de gestionar menús del sistema (RI-4, RI-19), con soporte de accesibilidad conforme al Real Decreto 1112/2018 (RNF-5).

#### **2. Alumno**
El módulo del alumno prioriza la experiencia del usuario y la accesibilidad:
- **Gestión de Tareas:**  
  Los alumnos pueden consultar tareas asignadas, marcarlas como completadas y enviar evidencias. Además, tienen acceso a notificaciones y un calendario semanal integrado (RI-9, RI-18).
- **Opciones de Accesibilidad:**  
  Se incluyen funcionalidades para personalizar paletas de colores y tamaños de fuente, mejorando la usabilidad para alumnos con discapacidades visuales (RI-8, RNF-10).
- **Comunicación y Perfil:**  
  Los alumnos pueden gestionar su sesión, acceder a su perfil y comunicarse directamente con educadores mediante un chat (RI-4).

#### **3. Profesor**
El módulo del profesor se centra en la supervisión y el apoyo a los alumnos:
- **Historial y Estadísticas:**  
  Los profesores tienen acceso a estadísticas detalladas del desempeño de sus alumnos en tareas (RI-9).
- **Gestión de Materiales:**  
  Pueden solicitar materiales necesarios para las tareas, verificando la disponibilidad en tiempo real (RI-6, RI-7).
- **Comunicación:**  
  Incluye herramientas de mensajería para comunicarse con alumnos y colaborar con otros usuarios del sistema (RI-4).

---

### **Requisitos No Funcionales Clave**
El sistema ha sido diseñado para ser intuitivo y eficiente, cumpliendo con los siguientes estándares:
1. **Tiempo de Respuesta:**  
   Las operaciones críticas como la creación de tareas o la carga de listas de usuarios cumplen con tiempos máximos de 3 y 5 segundos respectivamente (RNF-7, RNF-8).
2. **Accesibilidad y Responsividad:**  
   Cumple con los estándares del Real Decreto 1112/2018, ofreciendo soporte para usuarios con discapacidades y adaptándose a dispositivos móviles y computadoras (RNF-5, RNF-11).
3. **Interfaz Intuitiva:**  
   Garantiza que todas las funciones principales sean accesibles en 3 clics o menos, alineándose con la simplicidad esperada (RNF-9).

---

### **Requisitos de Información**
El sistema asegura un manejo estructurado y seguro de datos, integrando:
- **Gestión de Usuarios:**  
  Registra y organiza información detallada de alumnos, profesores y administradores (RI-1, RI-2, RI-3).
- **Gestión de Contenidos:**  
  Almacena tareas, subtareas, enunciados, respuestas y material asociado, proporcionando trazabilidad y seguimiento (RI-9, RI-10, RI-17, RI-18).
- **Gestión de Comunicación:**  
  Conserva historiales de chats y mensajes, fomentando una interacción fluida entre los distintos roles (RI-4, RI-5).

---

### **Beneficios del Sistema**
1. **Automatización y Control:**  
   Reduce la carga operativa mediante una gestión centralizada de usuarios, aulas y tareas.
2. **Adaptabilidad:**  
   Diseñado para ser accesible, inclusivo y adecuado para diferentes dispositivos.
3. **Mejora de la Comunicación:**  
   Facilita la interacción en tiempo real entre administradores, profesores y alumnos.
4. **Eficiencia y Escalabilidad:**  
   Optimizado para tiempos de respuesta rápidos y operaciones intuitivas, con la posibilidad de expandirse según las necesidades del cliente.

Este proyecto, fundamentado en los requisitos mencionados, busca ofrecer una solución robusta, eficiente y adaptada al entorno educativo moderno.

## Estructura del Proyecto

Este es el árbol de directorios de la primera iteración del proyecto:
   ```bash
.
├── app.js
├── config
│   ├── config.js
│   └── database.js
├── controllers
│   ├── adminController.js
│   ├── classroomController.js
│   ├── menuAccesibleController.js
│   ├── studentController.js
│   ├── tareaJuegoController.js
│   ├── tareaPeticionController.js
│   ├── tareaPorPasosController.js
│   └── teacherController.js
├── models
│   ├── admin.js
│   ├── classroom.js
│   ├── index.js
│   ├── relations
│   │   ├── alumnoTareaJuego.js
│   │   ├── alumnoTareaPeticion.js
│   │   ├── alumnoTareaPorPasos.js
│   │   ├── AulaProfesor.js
│   │   ├── menuAccesible.js
│   │   └── pedidoMaterial.js
│   ├── student.js
│   ├── tareaJuego.js
│   ├── tareaPeticion.js
│   ├── tareaPorPasos.js
│   └── teacher.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── adminRoutes.js
│   ├── classroomRoutes.js
│   ├── menuAccesibleRoutes.js
│   ├── studentRoutes.js
│   ├── tareaJuegoRoutes.js
│   ├── tareaPeticionRoutes.js
│   ├── tareaPorPasosRoutes.js
│   └── teacherRoutes.js
└── swaggerConfig.js
```
## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express.js**: Framework de servidor web.
- **Sequelize**: ORM para manejar las relaciones y consultas a la base de datos.
- **MySQL**: Base de datos relacional interna, alojada en el servidor central del centro.
- **Socket.IO**: Para la comunicación en tiempo real entre profesores, alumnos y administradores.
  
## Configuración e Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/tarerio-backend.git
   cd tarerio-backend

2. **Instalar dependencias**:
    ```bash
   npm install

3. **Configurar variables de entorno**:

 - Modificar el archivo config/config.js con las credenciales de la base de datos y configuración del servidor.

4. **Ejecutar migraciones**:
   ```bash
   npx sequelize-cli db:migrate

5. **Iniciar la aplicación**:
    ```bash
   npm start

## Desarrollo y colaboración

Este proyecto se desarrollará en tres iteraciones a lo largo de dos meses, con una entrega funcional en cada iteración. Las colaboraciones están abiertas para mejorar el código y añadir funcionalidades según las necesidades del centro.

<br>

¡Gracias por tu interés en TARERIO!