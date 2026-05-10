#Protecto desarrollo

Este proyecto fue hecho por dos personas. Es una página web sobre Dragon Ball donde se puede ver información de personajes, series, mangas, películas y videojuegos.  
Está hecha con HTML, CSS y JavaScript, y usamos una API de RestDB.io para traer los personajes con Axios.

---

## Planificación

Por qué elegimos este tema:  
Elegimos Dragon Ball porque es un tema que nos gusta y es muy conocido. Tiene muchos personajes, sagas, mangas, películas y juegos, así que nos pareció buena idea hacer una web con toda esa información.

Usuarios que usarían la página:
1. Fans de Dragon Ball: quieren ver datos de sus personajes favoritos o recordar cosas de las series y películas.  
2. Personas nuevas: quieren conocer el orden de las sagas o saber quién es quién en el mundo de Dragon Ball.

Requisitos del proyecto:
1. Tener varias secciones (personajes, series, mangas, películas y videojuegos).  
2. Que cada sección tenga un buscador para encontrar rápido lo que se busca.  
3. Usar una API para mostrar los personajes (sin tener que escribirlos a mano en el HTML).  

Extras: tener diseño responsive, un botón para subir al inicio y que la página se vea bien en distintos tamaños de pantalla.

Reparto del trabajo (qué hizo cada uno)

Marco de Haro Martín
- Desarrollo del HTML principal y estructura de las secciones.
- Parte del diseño en CSS (estilos base, colores, organización visual).
- Implementación de JavaScript relacionado con los buscadores y la navegación entre secciones.
- Corrección de errores en rutas de imágenes y enlaces del CSS.

Sebastián Coll Slodka
- Desarrollo y mejora del CSS (responsive, organización visual y detalles estéticos).
- Implementación del JavaScript, incluyendo la conexión con la API, funciones de renderizado de personajes y el botón de volver arriba.
- Limpieza y optimización del código JS.
- Revisión final del diseño y pruebas del funcionamiento general.

Trabajo hecho entre los dos
- Planificación del contenido de la web y elección del tema.
- Estructura del HTML, diseño en CSS y lógica en JavaScript (cada uno aportó en distintas partes).
- Conexión con la API y pruebas de la funcionalidad.
- Publicación en GitHub Pages y solución de errores.


---

## Diseño (arquitectura cliente-servidor)

La página usa el modelo cliente-servidor:

- Cliente: es lo que ve el usuario (la página). Está hecha con HTML, CSS y JavaScript.  
- Servidor: es donde está guardada la información (la API de RestDB.io).  
- Cómo funciona: el cliente pide los datos (por ejemplo, los personajes) al servidor. El servidor los envía y la página los muestra en pantalla.

---

## Despliegue (publicación en GitHub Pages)

1. Subimos todos los archivos del proyecto al repositorio
2. Activamos GitHub Pages desde Settings > Pages.  
3. GitHub nos dio el enlace público para ver la web.

Cosas buenas:  
- Es gratis y rápido.  
- Cada vez que actualizamos el repo, se actualiza la web.  
- No hay que instalar nada extra.

Problemas que tuvimos:  
- Algunas imágenes no cargaban porque las rutas estaban mal (por ejemplo, .jpe en lugar de .jpg).  
- A veces el CSS no se aplicaba porque los enlaces no apuntaban bien al archivo.  
- Hubo que revisar que los nombres de los archivos tuvieran las mismas mayúsculas y minúsculas (GitHub es sensible a eso).
- Problema spara conectar la API al codigo
  
Después de corregir eso, todo funcionó bien.

---

## Mantenimiento

Errores que encontramos:  
- Imágenes con extensiones o rutas incorrectas.  
- El buscador no funcionaba bien al principio por un error en los selectores.  
- Algunas fuentes de Google no cargaban a veces.  
- La conexion con la API

Cosas que ya arreglamos o mejoramos:  
- Corregimos las rutas de las imágenes.  
- Arreglamos el buscador.  
- Agregamos fuentes alternativas por si Google Fonts falla.
- Hizimos varias meoras al codigo para que quede mas limpio

Cosas que podríamos mejorar en el futuro:  
- Poner modo oscuro.  
- Mostrar más información de los personajes (por ejemplo, transformaciones o ataques).  
- Hacer que funcione incluso si no hay conexión.  

---

## Archivos principales del proyecto

- index.html: contiene la estructura de la página y las secciones.  
- styles.css: tiene los estilos, colores y el diseño.  
- script.js: controla todo lo interactivo (mostrar secciones, buscadores, conexión con la API, botón de volver arriba, etc.).

Ejemplo de cómo traemos los personajes desde la API:

```js
axios.get('https://personajes-5271.restdb.io/rest/Personajes-2', {
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': '665a00309dbb48069e715f6e'
  }
})


```

Integrantes del grupo

- Marco de Haro Martín
- Sebastián Coll Slodka
