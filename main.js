// Pruebas y uso de HashMap (todo en español)
const { HashMap, HashSet } = require('./hashmap');

function runHashMapTests() {
  console.log('Creando HashMap con loadFactor 0.75 y capacidad inicial 16');
  const test = new HashMap(0.75, 16);

  // Poblar con los valores indicados
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');

  console.log('\nEntradas actuales (entries):', test.entries());
  console.log('Tamaño (length):', test.length());
  console.log('Capacidad (approx):', test.capacity);
  console.log('Carga (load):', (test.length() / test.capacity).toFixed(2));

  // Sobrescribir algunos nodos (no debe cambiar length)
  console.log('\nSobrescribiendo algunos valores...');
  test.set('apple', 'verde?');
  test.set('banana', 'amarrillo?');
  console.log('Tamaño despues de overwrite (debe ser igual):', test.length());

  // Añadir el elemento que provoca el crecimiento
  console.log('\nAgregando "moon" para provocar rehash (resize)');
  test.set('moon', 'silver');
  console.log('Nueva capacidad (debe haber doblado):', test.capacity);
  console.log('Tamaño tras resize:', test.length());
  console.log('Carga tras resize:', (test.length() / test.capacity).toFixed(2));
  console.log('Entries tras resize:', test.entries());

  // Probar otros métodos
  console.log('\nPruebas adicionales:');
  console.log('get("lion") ->', test.get('lion'));
  console.log('has("carrot") ->', test.has('carrot'));
  console.log('remove("dog") ->', test.remove('dog'));
  console.log('remove("dog") otra vez (debe ser false) ->', test.remove('dog'));
  console.log('keys() ->', test.keys());
  console.log('values() ->', test.values());

  console.log('\nLimpiando HashMap');
  test.clear();
  console.log('length() tras clear ->', test.length());
}

function runHashSetDemo() {
  console.log('\n--- Demo HashSet ---');
  const hs = new HashSet();
  hs.add('uno');
  hs.add('dos');
  hs.add('tres');
  console.log('has("dos") ->', hs.has('dos'));
  console.log('size ->', hs.size());
  console.log('values ->', hs.values());
  hs.delete('dos');
  console.log('has("dos") tras delete ->', hs.has('dos'));
}

function main() {
  runHashMapTests();
  runHashSetDemo();
}

if (require.main === module) main();