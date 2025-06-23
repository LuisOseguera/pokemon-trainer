# Pokémon Trainer
Aplicación construida con Angular 20 para crear el perfil de un entrenador Pokémon, seleccionar un equipo y mostrar sus estadísticas.

### Tecnologías utilizadas
- Angular 20.
- RxJS / HTTPClient.
- SCSS.
- «localStorage» para guardar los datos temporalmente.
- «ngx-mask» para validación de documento de identidad.

### Indicaciones de instalación
#### 1. Cloná el repositorio:
```bash
git clone https://github.com/tu-usuario/pokemon-trainer.git
cd pokemon-trainer
```
#### 2. Instalá las dependencias:1. Cloná el repositorio:
```bash
npm install
```
#### 3. Ejecutá la aplicación:
```bash
npm run start
```

### Estructura del proyecto
```
src/
├── app/
│   ├── modules/    -> Módulos principales (perfil, equipo, resumen).
│   ├── core/       -> Servicios e interfaces.
│   └── shared/     -> Componentes que se comparten entre módulos.
```

### Validaciones incluidas
- Fecha de nacimiento para determinar si el usuario es mayor de edad.
- DUI obligatorio si es mayor de edad (con máscara `00000000-0`).
- Selección de máximo 3 pokémon de la primera generación.
- Búsqueda por nombre o ID.
- Visualización de estadísticas con barras de atributos.
- Virtual scroll.

### Build para producción
```bash
npm run build
```
### Despliegue con Docker
#### Dockerfile:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist/pokemon-trainer /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
#### Buildear y correr el contenedor:
```bash
docker build -t pokemon-trainer .
docker run -p 8080:80 pokemon-trainer
```

### Resetear el estado
Desde la pantalla de resumen, puedes hacer clic en “Reset Progress” para limpiar `localStorage` y comenzar de nuevo.

### Autor
Luis Alejandro Oseguera Osorto | osegueraluis43@gmail.com | [linkedin.com/in/osegueraluis](https://www.linkedin.com/in/osegueraluis/)