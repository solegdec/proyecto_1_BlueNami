-- Creacion de la Base de Datos
CREATE SCHEMA blueNami_db;

-- Seleccion de la Base de Datos
USE blueNami_db;

-- Creacion de Tablas

-- Creacion de Tabla de Categorias de Usuarios

CREATE TABLE userCategories (
id INT UNSIGNED AUTO_INCREMENT,
categoria VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id)
);


-- Creacion de Tabla de Usuarios

CREATE TABLE users (
id INT UNSIGNED AUTO_INCREMENT,
nombre VARCHAR(255) NOT NULL,
apellido VARCHAR(255) NOT NULL,
genero VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
pais VARCHAR(255) NOT NULL,
fechaNac DATE NOT NULL,
avatar VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
categoria_id INT UNSIGNED,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (categoria_id) REFERENCES userCategories (id)
);


-- Creacion de Tabla Modelos

CREATE TABLE models (
id INT UNSIGNED AUTO_INCREMENT,
modelo VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id)
);


-- Creacion de Tabla de Productos

CREATE TABLE products (
id INT UNSIGNED AUTO_INCREMENT,
nombre VARCHAR(255) NOT NULL,
descripcion TEXT,
foto VARCHAR(255) NOT NULL,
unidades INT UNSIGNED, 
precio DECIMAL NOT NULL,
modelo_id INT UNSIGNED,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (modelo_id) REFERENCES models (id)
);


-- Creacion de Tabla Colores

CREATE TABLE colours (
id INT UNSIGNED AUTO_INCREMENT,
color VARCHAR(255) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id)
);




-- Creacion Tabla Ordenes para el Carrito

CREATE TABLE orders (
id INT UNSIGNED AUTO_INCREMENT,
fecha DATETIME NOT NULL,
importe_total DECIMAL NOT NULL,
usuario_id INT UNSIGNED,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (usuario_id) REFERENCES users (id)
);

-- Creacion Tabla Items para el Carrito

CREATE TABLE items (
id INT UNSIGNED AUTO_INCREMENT,
cantidad INT UNSIGNED,
subtotal DECIMAL NOT NULL,
producto_id INT UNSIGNED,
usuario_id INT UNSIGNED,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (producto_id) REFERENCES products (id),
FOREIGN KEY (usuario_id) REFERENCES users (id)
);
-- Creacion de Tabla pivot entre Productos y Colores

CREATE TABLE products_colours (
id INT UNSIGNED AUTO_INCREMENT,
producto_id INT UNSIGNED,
color_id INT UNSIGNED,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


PRIMARY KEY (id),
FOREIGN KEY (producto_id) REFERENCES products (id),
FOREIGN KEY (color_id) REFERENCES colours (id)
);

-- Carga de datos a las tablas 

-- Carga tabla userCategories
insert into `userCategories`  VALUES 
(1, 'cliente', '2021-03-25 17:02:08', '2021-01-26 02:55:46'),
(2, 'usuario', '2020-10-01 16:06:35', '2020-10-26 09:19:07'),
(3, 'administrador', '2020-12-01 07:03:55', '2021-01-22 15:26:02');
                          
-- Carga tabla users


-- Carga tabla models
insert into `models`  VALUES 
 (1, 'AUKAI', '2021-08-09 12:03:29', '2021-01-04 03:34:00'),
 (2, 'WAI', '2021-03-17 08:42:10', '2021-08-17 09:37:46'),
 (3, 'ONE', '2021-08-12 12:41:39', '2021-09-25 22:11:37'),
 (4, 'NALU', '2021-08-05 01:00:29', '2021-08-13 03:38:15'),
 (5, 'MALUHIA', '2020-11-05 08:09:40', '2021-07-14 07:51:51'),
 (6, 'KEALA', '2021-04-12 10:19:45', '2021-05-20 08:02:16'),
 (7, 'KAILANI', '2020-11-10 23:50:15', '2021-02-26 19:35:18'),
 (8, 'MALIA', '2020-10-27 01:17:21', '2021-08-31 02:43:27'),
 (9, 'MALU', '2021-02-27 22:06:56', '2021-06-13 03:04:04'),
 (10, 'INOA', '2021-04-11 15:54:24', '2021-07-23 21:43:27'),
 (11, 'MAELI', '2021-03-14 17:26:08', '2021-09-27 20:07:42'),
 (12, 'KOA', '2021-04-29 02:31:42', '2020-12-22 13:00:56');

-- Carga tabla products

insert into `products`  VALUES
 (1, 'Gun', 'nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu', 'tabla1chica.png', 73, '12086.93', 10, '2021-05-17 18:52:53', '2021-08-24 13:19:43'),
 (2, 'SuperFish', 'erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus', 'tabla2.jpg', 39, '11472.70', 3, '2021-03-15 23:20:10', '2021-05-25 13:09:01'),
 (3, 'Evolutiva', 'ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent', 'tabla3.png', 76, '18811.04', 8, '2021-05-15 13:00:17', '2021-06-05 16:06:20'),
 (4, 'SoftBoard', 'in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at', 'tabla3Sole.png', 12, '13144.68', 7, '2021-03-08 08:44:58', '2021-01-12 18:46:21'),
 (5, 'LongBoard', 'nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante', 'tabla4.png', 93, '7672.71', 12, '2021-01-14 14:54:20', '2021-06-25 21:03:05'),
 (6, 'Retro', 'pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel', 'tabla4Sole.png', 14, '17211.16', 6, '2021-07-24 01:47:06', '2021-05-15 11:27:40'),
 (7, 'TwinFin', 'hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa', 'tabla5.png', 95, '19267.68', 3, '2020-09-02 18:29:28', '2021-01-29 14:39:31'),
 (8, 'Gold', 'eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien', 'tabla6.png', 60, '6012.38', 12, '2021-08-16 11:54:17', '2020-12-05 14:28:36'),
 (9, 'Princess', 'ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel', 'tabla7.png', 32, '6630.48', 4, '2021-07-21 20:58:22', '2021-05-03 07:36:03'),
 (10, 'ShortBoard', 'metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit', 'tabla2.png', 10, '8888.82', 7, '2020-11-29 16:28:01', '2021-06-18 12:15:14'),
 (11, 'Fish', 'vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis', 'tabla4.png', 68, '12766.93', 3, '2020-09-22 22:25:35', '2020-09-02 00:17:46'),
 (12, 'Shark', 'sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl', 'tabla2.png', 35, '19280.78', 10, '2021-05-10 15:42:03', '2021-07-11 20:36:04');



-- Carga tabla colours
insert into `colours`  VALUES
 (1, 'Maroon', '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
 (2, 'Aquamarine', '2021-06-17 17:29:07', '2021-01-13 02:44:18'),
 (3, 'Purple', '2020-12-08 15:46:12', '2020-09-29 13:54:06'),
 (4, 'Khaki', '2021-05-07 09:27:48', '2021-05-17 14:04:28'),
 (5, 'Indigo', '2021-07-20 08:56:37', '2021-02-04 23:36:39'),
 (6, 'Red', '2021-04-11 19:39:40', '2021-04-05 18:15:21'),
 (7, 'Crimson', '2020-12-27 11:46:25', '2021-01-11 12:14:57');


-- Carga tabla products_colours
insert into `products_colours`  VALUES
(1, 1, 1, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(2, 1, 3, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(3, 1, 5, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(4, 2, 1, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(5, 3, 3, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(6, 4, 5, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(7, 5, 5, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(8, 6, 2, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(9, 7, 2, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(10, 8, 2, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(11, 9, 6, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(12, 10, 3, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(13, 11, 7, '2021-03-09 04:51:28', '2020-10-23 17:35:43'),
(14, 12, 1, '2021-03-09 04:51:28', '2020-10-23 17:35:43');













