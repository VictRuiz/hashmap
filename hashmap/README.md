# HashMap y HashSet en JavaScript (todo en español)

Este repositorio contiene una implementación educativa de un HashMap y un HashSet en JavaScript, junto con un archivo `main.js` que ejecuta pruebas básicas.

Archivos incluidos:

- `hashmap.js`: Implementación de `HashMap` (con `set`, `get`, `has`, `remove`, `length`, `clear`, `keys`, `values`, `entries`) y una implementación sencilla de `HashSet` (extra credit). Las claves están limitadas a `string`.
- `main.js`: Script de ejemplo en español que prueba la funcionalidad solicitada por la tarea (insertar, sobrescribir, forzar resize, y comprobar métodos).
- `README.md`: Este archivo (instrucciones en español).

Cómo ejecutar:

```bash
node main.js
```

Qué se probó:

- Población del `HashMap` con 12 entradas hasta alcanzar la carga 0.75.
- Sobrescritura de algunos valores (debe mantener el mismo `length`).
- Inserción adicional (`'moon'`) que provoca el `resize` (capacidad se dobla) y re-distribución de entradas.
- Verificación de `get`, `has`, `remove`, `length`, `clear`, `keys`, `values` y `entries`.
- Demo simple de `HashSet`.

Notas:

- La implementación usa "encadenamiento separado" (cada bucket es un array de pares [clave, valor]).
- Antes de acceder a `buckets[index]` se verifica el índice y se lanza `Error` si está fuera de rango, tal como exige la tarea.
- Diseñado para propósitos educativos; no es optimizada para producción ni es thread-safe.

Si necesitas que los archivos sean módulos ES (import/export) en vez de CommonJS, dímelo y lo adapto.
