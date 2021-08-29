Sprint 1:
Resumen de las Daily meetings:
Realmente fueron muy importantes para mantenernos al tanto de los avances y/o problemas encontrados, en la parte del trabajo que le toco a cada miembro del equipo. 
Mas alla de eso, tambien sirvieron para acrecentar la confianza con el grupo, y poder tener un dia a dia mas claro del trabajo de cada uno. 
Las daily han sido una gran herramienta en el desarrollo del sprint, y las mantendremos a lo largo de toda la cursada.



Sprint 2:
Minutas:

Miércoles 04/08/2021: Reunión de Planeamiento de Sprint 3.
Viernes 06/08/2021: En la carpeta del proyecto se agregaron en el entry point las nuevas constantes (express, app, port, path,) los app.get para cada uno de los recursos (index, producCart, productDetail, products, login, register) con sus respectivos callbacks con los .sendFiles. 
Martes 10/08/2021: Se desestimó el proyecto anterior y se creó a través de express generator la carpeta del proyecto. Se crearon las nuevas carpetas requeridas según buenas prácticas de jerarquía de carpetas. Se cambiaron a .ejs los html.
Miércoles 11/08/2021 (solos cada integrante previo a la reunion): Se crearon los nuevos archivos para hacer modularizable al proyecto. Son los routers de cada recurso y los controladores de cada recurso.
Miércoles 11/08/2021:Se actualizan el entry point, los routers y controladores con todo lo requerido
Jueves 12/08/2021 (previo a la reunion): Se crea el archivo de listado de productos
Jueves 12/08/2021: Se crean los archivos parciales y se incluyen en todas las vistas que corresponde.
Viernes 12/08/2021 (previo a la reunion): Se crea el archivo para crear o modificar productos.
Viernes 12/08/2021 (backlog de Sprint 2): Se separan nuevamente los CSS en uno por recurso.
Sab 14/08/2021: Intentamos implementar los botones para que el administrador pueda ir de la vista con el listado de productos a la vista de crear y modificar producto.
Domingo 15/08/2021: Se crean los archivos de retrospectiva y minutas de reunión.
Lunes 16/08/2021: Se crean los archivos de crear producto y modificar producto.



Sprint 3. Minutas:

17/8 
complicaciones con el GitHub de dos miembros del equipo.
creacion de las vistas del listado para administrar los ABM de usuarios y de productos.
creacion de nav bar para administracion de usuarios y productos.
18/8 
se arregla el GitHub de dos miembros del equipo.
creacion de archivos JSON
problemas con el nodemon bin/www. Se soluciono sacando el app.listen en app.js.
creacion de vistas de formulario para usuarios y productos
19/8 
no nos funciona el proyecto en el heroku
20/8
se modifican controladores y rutas para listado y detail de productos.
no anda la vista de administradores, asi que arrancamos con las funcionalidades en el administrador de productos (no en administrador de productos)
en el controlador de productos se crean las constantes y funciones genericas para leer el JSON y para escribir en el JSON.
se crean los metodos para listar, creacion, modificacion y borrado de productos.
21/8 
nos sacamos dudas en la clase de co-learning. sobre todo si debiamos hacer todo sobre el controlador de productos o si debe ser en uno nuevo de administrador de productos. entendimos se podia hacer de cualquiera de las dos maneras dado que aun no trabajamos con roles para permisos de usuarios. 
por otro lado nos sacamos dudas de ruteo.
22/8
armamos las rutas para el controlador de productos.modificando el router y armando los metodos. 
se hizo dinamica la vista de administrador de usuario 
volvemos a la duda si el ABM se debe hacer desde una vista de administrador o desde el listado de productos y su detalle.
se actualiza la vista de productos para que se vea bien al tomar los datos (incluso las fotos) desde el JSON en vez de tener todos los datos harcodeados en la vista.
23/8 
se agregan mas fotos para que la vista de productos tenga diferentes.
se actualiza el admin  product controller para ver de poder hacer el CRUD desde el adminitrador de productos en vez de desde el listado de productos.
se trabaja en las rutas del admin product router y en los metodos del admin product controller
24/8 
se trabaja en la creacion de productos. no logramos hacerlo. se hizo meet con mati para ver que nos esta sucediendo. muy trabados.
se trabaja en el css de productos dado que al ser dinamico precisa ajustes,
25/8
se arregla el pull down del formulario del abm de prodcutos.
se sigue trabajando en el CSS de productos.
recibimos el feedback de mati:
1) teniamos problemas en la ubicacion de algunos app.use debian estar arriba de las rutas en el app.js
2) en la ruta del admin/create, tomaba al create como un parametro (?), entonces para solucionarlo debimos agregarle a la ruta del detail un detail/:id para ser mas especificos.
3) teniamos mal escrita la funcion del writeJson.
hicimos las correcciones con el feedback de mati. trabajamos en las rutas, controller y vistas. ya anda casi todas las funciones
se modifican las fotos de las tablas para que todas queden del mismo tamaño en la vista.
rabajamos en las rutas, controller y vistas. ya andan todas las funciones!
26/8 
se actualiza el json de productos
27/8
se actualiza la vista y css de los administradores de producto y usuarios. y de productos y detalle de productos.
28/8 
se crea un archivo con una funcion para poder tener productos relacionados en el detalle de productos y en el carrousel.
29/8 
se arregla el ruteo para multer
se crea el middleware para poder subir los archivos de nuevos productos

