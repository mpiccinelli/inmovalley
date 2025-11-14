# InmoValley – Maquetación de la Home

Este repositorio contiene una **maqueta funcional** de la página de inicio de una inmobiliaria.
El objetivo es demostrar buenas prácticas de estructura, accesibilidad, responsividad y organización del código en un entorno estático.
Todos los enlaces utilizan `#` para evitar navegación real, ya que el enfoque está únicamente en la presentación de la home.

## Tecnologías utilizadas

Versiones idénticas a las empleadas en el desarrollo:

### Front-end

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **Bootstrap 5.1.3**
  CDN oficial: [https://getbootstrap.com/](https://getbootstrap.com/)
* **Tema personalizado de Bootstrap 5**
  Archivo `bootstrap-theme.css`
* **jQuery 3.7.1**
  CDN: [https://jquery.com/](https://jquery.com/)
* **Select2 4.1.0-rc.0**
  Tema: *Select2 Bootstrap 5 Theme 1.3.0*
  Documentación: [https://select2.org/](https://select2.org/)
* **Google Fonts (Montserrat y Caveat)**
* **Google reCAPTCHA v2 (clave de pruebas)**

### Otras integraciones

* `manifest.json` configurado para simular PWA en modo **standalone**
* Animaciones CSS y JS creadas manualmente con **IntersectionObserver**

## Accesibilidad y buenas prácticas

El proyecto sigue criterios inspirados en **WCAG**:

* contraste adecuado
* estructura semántica con `header`, `main`, `section` y `footer`
* uso de atributos como `aria-label`, `aria-controls`, `aria-expanded`, roles apropiados
* imágenes con texto alternativo
* enlace inicial *Skip to main content*
* navegación por teclado en tarjetas y elementos interactivos
* menú móvil reestructurado para compatibilidad con lectores de pantalla

## SEO y metadatos

En el `<head>` de `index.html` se incluyeron varias etiquetas relevantes para SEO y rastreadores:

* `meta name="robots" content="index, follow"`
* `meta name="description"`
* `meta name="keywords"`
* `meta name="author"`
* `link rel="canonical"`

Estas marcas ayudan a orientar buscadores y robots de indexación en un ambiente real.
En un entorno de producción, esto debería complementarse.

## Uso de imágenes

* Se dio **preferencia al uso de imágenes en formato SVG**, por ser leves, escalables y adequadas para layouts responsivos.
* Por tratarse de una maquetación local y por limitaciones de tiempo, **no se realizó optimización avanzada de imágenes**, como:

  * conversión a **WebP** o **AVIF**
  * uso de `loading="lazy"`
  * generación de *srcset* para imágenes responsivas

Estas técnicas son consideradas **buenas prácticas** y deberían implementarse en un proyecto destinado a producción.

## Estructura de carpetas

```
/
├── index.html
├── manifest.json
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── bootstrap-theme.css
│   │   ├── animations.css
│   ├── js/
│   │   ├── script.js
│   │   ├── animations.js
│   ├── images/
│       ├── (todas las imágenes utilizadas en la maqueta)
```

## Organización del código

* Funcionalidades separadas en módulos dentro de `script.js`
* Animaciones centralizadas en `animations.css` y `animations.js`
* Select2 configurado con tema Bootstrap 5 y búsqueda deshabilitada mediante
  `minimumResultsForSearch: Infinity`
* Menú móvil generado dinámicamente a partir del menú de escritorio
* Interacciones de tarjetas, banners, categorías y propiedades incluidas para demostrar comportamiento visual
* Formulario validado mediante **Bootstrap nativo + jQuery**
* Todo el contenido es estático, enfocado únicamente en la home

## Tiempo de desarrollo

Se invirtieron aproximadamente **15 horas**, incluyendo:

* estructura HTML
* maquetación completa
* creación del tema personalizado de Bootstrap
* desarrollo de animaciones
* interacciones y comportamientos de UI
* validación del formulario
* ajustes de accesibilidad
* revisión y refinamiento general

## Sobre el autor

**Marlos Vinicius S Piccinelli**

Programador y creador de productos digitales.
Puedes encontrarme en:
* [Correo](mailto:marlosvinicius.info@gmail.com)
* [LinkedIn](https://www.linkedin.com/in/mpiccinelli/)
