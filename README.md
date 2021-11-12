# Introduccion

Programa de terminal que crea, guarda y filtra las notas mediante lineas de comandos.

Como tal es un simple proyecto que actualmente realiza las siguientes funciones:

* Creación de notas mediante lineas de comando usando yargs como interfaz en el terminal.
* Manipulación del fichero JSON que contiene las notas anteriores: Creación, borrado y filtrado de contenido
* Testeo de datos con Jest (Nota: El testo de errores se encuentran comentados en el fichero de pruebas y en handler_notes.js, por lo que saltará esas pruebas)

## Herramientas usadas:

* Yargs (Creación de CLI para la aplicación)
* Chalk (Añadido de colores para informar al usuario de errores y de la realización del proceso)
* Jest

## Modo de uso

Usar el siguiente comando para acceder a la interfaz de ayuda de la aplicación:

`node app.js --help `

### Crear nuevas notas

`node app.js add -t "Titulo de la tarea" -b "Texto de la tarea" `

### Borrado de la nota 

`node app.js remove -b "Texto de la tarea" `

### Mostrar notas

`node app.js list `

### Filtrar todas las notas según el título de la tarea

`node app.js filter -t "Titulo de la tarea"`

### Borrado del fichero que contiene las notas

Por defecto al crear una nueva nota se genera un fichero en el directorio del programa llamado 'notes.json'. Puede borrarse desde la aplicación con el siguiente comando:

`node app.js delete`
