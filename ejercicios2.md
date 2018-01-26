# Ejercicios de Node 2

Autor: Alan Badillo Salas

## Sistema de Archivos

Crear un programa que lea un archivo de texto mediante `fs.readFileSync(nombre, "utf-8")` e imprima cada línea del archivo numerada comenzando por `1`.

Crear un programa que genere `100` objetos con datos de personas falsos como `{nombre: "Ana", edad: 21, sexo: "Mujer"}` y guarde los datos de las personas en un archivo llamado `personas.txt` con un formato similar al de abajo:

~~~txt
Mujer: Ana (21 años)
Hombre: Beto (34 años)
Hombre: Carlos (51 años)
Mujer: Daniela (25 años)
...
~~~

## Express

Crear una API WEB con las siguientes rutas definidas:

~~~txt
GET /api/personas
> Devuelve 100 personas con datos falsos

GET /api/productos
> Devuelve 100 productos falsos

GET /api/saludar?nombre
> Devuelve un mensaje saludando al parámetro query `nombre`

GET /api/personas/filtro1?nombre
> Devuelve de 100 personas falsas aquellas llamadas "Ana"

GET /api/personas/filtro2?edad
> Devuelve de 100 personas falsas aquellas mayores a 35 años

GET /api/personas/filtro3?sexo
> Devuelve de 100 personas falsas aquellas con el sexo definido en el query `sexo`
~~~

## MSSQL

Crear un programa que se conecte a mssql y cree la tabla usuarios como se describe:

~~~txt
- id        INT           : (PRIMARY KEY, UNIQUE, AUTOINCREMENT)
- nombre    VARCHAR(60)   : (NOT NULL)
- email     VARCHAR(128)  : (NOT NULL)
- password  VARCHAR(128)  : (NOT NULL)
- picture   VARCHAR(256)
~~~

Crear un programa que se conecte a mssql e inserte 100 registros de usuarios falsos.

Crear un programa que se conecte a la base de datos, consulte todos los usuarios y guarde en un archivo todos los usuarios (nombre, email) con el siguiente formato:

~~~txt
batman <batman@gmail.com>
superman <superman@gmail.com>
gatubela <caty@gmail.com>
...
~~~