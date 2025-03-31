# Proyecto: Gestión de Equipos con Node.js y Express

Este proyecto es una API en Node.js con Express que permite gestionar equipos de trabajo, incluyendo la creación, consulta y eliminación de equipos.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js por defecto)

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias del proyecto:
   ```sh
   npm install
   ```

## Configuración

Asegúrate de tener los archivos de datos necesarios dentro del directorio `data/`:

- `data/members.js` → Contiene los miembros disponibles.
- `data/teams.txt` → Archivo donde se almacenan los equipos.

## Ejecución del servidor

Para iniciar el servidor en modo desarrollo, usa:

```sh
npm start
```

El servidor se ejecutará en `http://localhost:8080/`.

## Endpoints disponibles

### 1. Obtener miembros

**GET** `/members`

### 2. Crear un equipo

**POST** `/create/team`

- **Body:**
  ```json
  {
    "name": "Nombre del equipo",
    "projectLeaderId": 1,
    "accountManagerId": 2,
    "engineeringArchitectId": 3
  }
  ```

### 3. Obtener equipos

**GET** `/teams`

### 4. Eliminar un equipo

**POST** `/delete/team`

- **Body:**
  ```json
  {
    "teamId": "uuid-del-equipo"
  }
  ```

## Notas adicionales

- Asegúrate de que los archivos de datos existen antes de ejecutar la API.
- Puedes modificar el puerto del servidor en `index.js`.
