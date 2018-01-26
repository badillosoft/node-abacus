# Ejercicios de Node 3

Autor: Alan Badillo Salas

## Reportes Avanzados de Base de Datos

Crear un programa que genere las siguientes tablas:

~~~txt
# clientes
- id_cliente
- nombre
~~~

~~~txt
# productos
- id_producto
- sku
- descripcion
- precio
~~~

~~~txt
# compras
- id_compra
- id_cliente
- id_producto
- fecha
~~~

Crear un programa que inserte 10 clientes y 5 productos aleatorios.

Crear un programa que seleccione todos los clientes y seleccione todos los productos, luego para cada cliente: tomar un producto aleatorio y registrar una compra, repetir 20 veces ese proceso.

Crear un programa que para cada cliente imprima un reporte con el número de compras realizadas, cada uno de los productos comprados (precio y descripcion) y el total de dinero gastado (la suma de las compras), con el formato que se muestra en el ejemplo:

~~~txt
-- Cliente: Ana
Productos comprados: 20
Lista de productos:
* Aceite 123 // $18.50
* Refresco Coca Cola // $12.50
* Galletas Marias // $8.50
* Aceite 123 // $18.50
...
Total gastado: $254.50

-- Cliente: Beto
Productos comprados: 20
Lista de productos:
* Galletas Marias // $8.50
* Refresco Coca Cola // $12.50
* Aceite 123 // $18.50
* Galletas Marias // $8.50
...
Total gastado: $198.00
~~~

Crear un programa que muestre una lista con los nombres de los clientes ordenados por total gastado descendente:

~~~txt
Ana $254.50
Carlos $201.50
Beto $198.00
...
~~~
