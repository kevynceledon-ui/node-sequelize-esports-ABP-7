#  Esports Management System - Proyecto ABP 7

###  Módulo: Acceso a datos en aplicaciones Node.js

Este proyecto es un sistema de gestión para equipos de Esports y sus jugadores. Desarrollado con **Node.js** y **Express**, utiliza **Sequelize** como ORM para interactuar con una base de datos **PostgreSQL**. El sistema garantiza la integridad de los datos mediante transacciones, relaciones robustas y una capa de auditoría de errores.

---

##  Tecnologías Utilizadas

*   **Backend:** Node.js, Express.js
*   **Base de Datos:** PostgreSQL
*   **ORM:** Sequelize
*   **Motor de Plantillas:** Handlebars (HBS)
*   **Logs:** Sistema de archivos (fs) para auditoría.
*   **Entorno:** Dotenv para gestión de variables sensibles.

---

##  Estructura del Proyecto (MVC)

El proyecto sigue el patrón **Modelo-Vista-Controlador** para asegurar un código escalable y organizado:

*   `models/`: Definición de esquemas de `Player` y `Team` con sus respectivas asociaciones.
*   `controllers/`: Lógica de negocio, manejo de transacciones y validaciones.
*   `routes/`: Definición de endpoints y parámetros de ruta.
*   `views/`: Plantillas dinámicas para la visualización del frontend.
*   `logs/`: Archivos persistentes de auditoría de tráfico y errores.
*   `utils/`: Configuración de conexión a la DB y helpers de rutas.

---

##  Características Principales e Implementación

### 1. Gestión de Relaciones (1:N)
Se implementó una relación donde un **Equipo tiene muchos Jugadores**. 
*   **Integridad Referencial:** Se configuró `onDelete: 'RESTRICT'` tanto en el modelo como en el controlador para impedir la eliminación de equipos que posean jugadores activos, evitando registros huérfanos.

### 2. Transacciones Atómicas (Lección 4)
Para la creación de equipos, se desarrolló una ruta transaccional que registra un **Equipo y su Capitán** en una sola operación. 
*   **Garantía de Rollback:** Si la creación del capitán falla (por ejemplo, por nickname duplicado), el sistema deshace automáticamente la creación del equipo.

### 3. Sistema de Auditoría (Tarea PLUS)
*   **Log de Visitas:** Registro automático de cada petición en `log.txt`.
*   **Log de Fallos:** Se implementó un registro específico en `failed_transactions.txt` para documentar cada error en las transacciones, facilitando la depuración y auditoría técnica.

### 4. Interfaz Dinámica (Tarea PLUS)
Uso de **Handlebars** para renderizar una tabla HTML en tiempo real que muestra:
*   Datos anidados (Jugador + Nombre de su Equipo).
*   Indicador visual de **CAPITÁN** mediante lógica condicional y un campo booleano `isCaptain`.

---

##  Endpoints del API

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Vista de inicio con tabla de jugadores y equipos (HBS). |
| `GET` | `/player` | Listado JSON de jugadores con filtros por rol (Query Params). |
| `POST` | `/player` | Crear un nuevo jugador individualmente. |
| `PUT` | `/player/:id` | Actualizar datos de un jugador (ID por ruta). |
| `POST` | `/team/transactional` | Registro atómico de Equipo + Capitán (Transacción). |
| `DELETE` | `/team/:id` | Eliminar equipo (Protegido por restricción de integridad). |

---

##  Instalación y Configuración

1.  **Clonar el repositorio.**
2.     ```bash

   git clone [https://github.com/kevynceledon-ui/node-express-abp6.git]

   (https://github.com/kevynceledon-ui/node-express-abp6.git)

   cd node-express-abp6

   ```
3.  **Instalar dependencias:** `npm install`.
4.  **Configurar variables de entorno:** Crear un archivo `.env` con las credenciales de PostgreSQL (`DB_USER`, `DB_PASSWORD`, `DB_NAME`, etc.).
5.  **Iniciar el servidor:** 
    ```bash
    npm run dev
    ```


> **Nota sobre Integridad:** El sistema requiere que la base de datos esté activa para sincronizar los modelos automáticamente. La configuración actual usa `alter: true` para aplicar cambios en el esquema sin pérdida de datos.