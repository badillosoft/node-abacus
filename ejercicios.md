# Ejercicios de Node

Autor: Alan Badillo Salas

## Introductorios

Crear un programa que defina dos números `a = 123` y `b = 581`, crear una variable `c` que contenga el valor más grande
entre `2 * a * a` y `10 * b` utilizando el operador `?` (`c = condicion ? expresionV : exprF`).

Crear un programa que defina un arreglo vacío llamado `q` el cual deberá ser llenado mediante un ciclo `for` con todos los números
multiplos de `3`, comenzando en `10` hasta el `1000`.

Crear un programa que dado el arreglo `const p = [1, 8, 16, 32, 64, 128, 256]` imprima el número `1024` dividido por cada elemento.

Crear un programa que dado el arreglo `const h = ["1", "2", "3", "6", "10.5", "20.9"]` genere el arreglo `[1, 2, 3, 6, 10.5, 20.9]`
e imprima la suma de todos los elementos.

Crear un programa que calcule el promedio del arreglo `[1, 2, 9, 29, 101]`.

## Intermedios

Crear una función que dado un arreglo de números, devuelva un arreglo de arreglos que contenga un arreglo con los números pares
y otro arreglo con los números impares. (ej. `[1, 2, 3, 4, 5, 6, 7, 8] -> [[2, 4, 6, 8], [1, 3, 5, 7]]`)

Crear una función que dado un arreglo de números, devuelva un arreglo de arreglos, de forma que parta el arreglo original de tal
forma que cada arreglo partido contenga sólo números positivos o sólo números negativos y no haya dos arreglos con números del
mismo signo consecutivamente.
(ej. `[1, 2, 3, -1, -2, -3, -4, 5, 6, 7, -8, -9, 10] -> [[1, 2, 3], [-1, -2, -3, -4], [5, 6, 7], [-8, -9], [10]]`)

Crear una función que reciba un número y un callback y mande a ejecutar la función de callback después de tantos milisegundos 
como se haya especificado en el número que recibe.

Analiza el siguiente código y explica que hace:

~~~js
const next = i => {
  if (i >= 10) {
    return;
  }
  
  console.log(i);
  next(i + 1);
};

next(0);
~~~

Crea una función llamada `repetir(n, callback)` que ejecute n-veces el callback enviado a la función con un sólo parámetro
que contenga el número de iteración y prueba el siguiente código:

~~~js
repetir(10, i => {
  console.log("")
});
~~~

## Avanzados

Recrea la función `repetir(n, callback)` pero haz que espere el `1000 ms` en cada ejecución para llamar otra vez a callback.

Crea una función que devuelva una promesa que se resuelva tras `5000 ms` y manda a llamar a dicha función, cuando está se resuelva
imprime `"Han pasado 5 segundos"`.

Crea una función llamada `stop(n)` que devuelva una promesa que se resuelva a los `n` segundos. Manda a llamar a `stop` tres veces
con `n = 5000`, al final imprime `"Han pasado 15 segundos"` (cuentalos).
