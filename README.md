# TARERIO - Aplicación de Gestión de Tareas y Agenda para Estudiantes PTVAL

## Descripción del Proyecto

TARERIO es una aplicación backend diseñada para gestionar tareas y agendas de estudiantes del programa PTVAL en el Centro San Rafael. La herramienta permite a los administradores del centro, profesores y alumnos llevar un seguimiento completo de las tareas asignadas, así como gestionar aulas virtuales, peticiones de material, y comunicarse entre ellos mediante chat. Este repositorio contiene la primera iteración del backend, que incluye los modelos de datos, controladores y rutas principales de la aplicación.

## Funcionalidades

1. **Gestión de Aulas Virtuales**:
   - Creación de aulas virtuales.
   - Asignación de profesores y alumnos a las aulas.
   
2. **Gestión de Tareas**:
   - Creación y asignación de tareas de tipo “Paso a paso”, “Juego” o “Petición”.
   - Visualización y marcaje de tareas como completadas por los alumnos.
   - Seguimiento de tareas y comunicación directa con los estudiantes vía chat.
   
3. **Peticiones**:
   - Los administradores pueden solicitar a los alumnos la recogida de material y la recopilación de comandas (menús deseados por aula para el día).
   - El profesorado puede hacer peticiones de material al administrador y seguir el progreso de los alumnos.

## Estructura del Proyecto

Este es el árbol de directorios de la primera iteración del proyecto:
   ```bash
   .
   ├── app.js                          # Archivo principal de inicio de la aplicación
   ├── config                          
   │   ├── config.js                   # Configuración general de la aplicación
   │   └── database.js                 # Configuración de la base de datos
   ├── controllers                     # Controladores de las distintas entidades
   │   ├── adminController.js
   │   ├── classroomController.js
   │   ├── studentController.js
   │   ├── tareaJuegoController.js
   │   ├── tareaPorPasosController.js
   │   └── teacherController.js
   ├── migrations                      # Archivos de migración para el esquema de la base de datos
   │   ├── 20241022174341-alumno-model.js
   │   ├── 20241023143901-profesor-model.js
   │   ├── 20241024112344-aulas-model.js
   │   ├── 20241028160544-add-imagenBase64-to-alumnos.js
   │   └── 20241028161916-add-imagenBase64-to-profesores.js
   ├── models                          # Definiciones de los modelos de datos
   │   ├── admin.js
   │   ├── classroom.js
   │   ├── relations
   │   │   └── alumnoTareaJuego.js
   │   ├── student.js
   │   ├── tareaJuego.js
   │   ├── tareaPorPasos.js
   │   └── teacher.js
   ├── package.json                    # Archivo de configuración de dependencias
   ├── package-lock.json
   ├── README.md                       # Documentación del proyecto
   └── routes                          # Rutas de las distintas funcionalidades
      ├── adminRoutes.js
      ├── classroomRoutes.js
      ├── studentRoutes.js
      ├── tareaJuegoRoutes.js
      ├── tareaPorPasosRoutes.js
      └── teacherRoutes.js

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