Proyecto de prueba entrevista

Agradecimientos a los creadores y colaboradores de las distintas librerias usadas para la contrucción del proyecto.

### Requisitos

-   DB mysql

## Instalación

```bash
$ npm install
```

## Despliegue del servidor

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Al desplegar el servidor se ejecutara un script que inicializa datos en la DB, como un usuario admin inicial y ciudad y sede iniciales, se puede omitir la ejecución del script agregado la variable de entorno `OMIT_INITIAL_SCRIPT=true`, así mismo las credenciales del usuario administrador (inicial) pueden ser cambiadas agregando o modificando las variables de entorno `DEFAULT_USER_EMAIL` y `DEFAULT_USER_PASS`

## DB

-   DB MYSQL
    La configuración de la DB se debe hacer en el archivo `ormconfig.json`

#### Migraciones

```bash
# Genera la migración bajo el nombre de initial-migration
$ npm run db:migration:generate initial-migration

# Ejecuta la migración en la base de datos
$ npm run db:migration:run
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
