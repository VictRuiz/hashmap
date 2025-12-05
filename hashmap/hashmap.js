// HashMap y HashSet en JavaScript
// Implementación educativa, claves restringidas a string.

class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    if (initialCapacity <= 0) throw new Error('initialCapacity must be > 0');
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._size = 0;
  }

  _checkIndex(index, bucketsLength = this.buckets.length) {
    if (index < 0 || index >= bucketsLength) {
      throw new Error('Trying to access index out of bounds');
    }
  }

  // Hash con módulo dentro del bucle para evitar overflow en claves largas.
  _bucketIndex(key, capacity = this.capacity) {
    if (typeof key !== 'string') throw new Error('Only string keys are supported');
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      // aplicar módulo con la capacidad para mantener el número pequeño
      hashCode = (prime * hashCode + key.charCodeAt(i)) % capacity;
    }
    // asegurarnos no-negativo
    return Math.abs(hashCode);
  }

  set(key, value) {
    const idx = this._bucketIndex(key);
    this._checkIndex(idx, this.buckets.length);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // actualizar
        bucket[i][1] = value;
        return;
      }
    }
    // insertar nuevo
    bucket.push([key, value]);
    this._size++;

    if (this._size / this.capacity > this.loadFactor) {
      this._resize(this.capacity * 2);
    }
  }

  get(key) {
    const idx = this._bucketIndex(key);
    this._checkIndex(idx, this.buckets.length);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) return bucket[i][1];
    }
    return null; // según la especificación
  }

  has(key) {
    const idx = this._bucketIndex(key);
    this._checkIndex(idx, this.buckets.length);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) return true;
    }
    return false;
  }

  remove(key) {
    const idx = this._bucketIndex(key);
    this._checkIndex(idx, this.buckets.length);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this._size;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._size = 0;
  }

  keys() {
    const out = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        out.push(bucket[j][0]);
      }
    }
    return out;
  }

  values() {
    const out = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        out.push(bucket[j][1]);
      }
    }
    return out;
  }

  entries() {
    const out = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        out.push([bucket[j][0], bucket[j][1]]);
      }
    }
    return out;
  }

  _resize(newCapacity) {
    const capacity = Math.max(1, Math.floor(newCapacity));
    const oldEntries = this.entries();
    const oldBucketsLength = this.buckets.length;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.capacity = capacity;
    this._size = 0;
    for (let i = 0; i < oldEntries.length; i++) {
      const [k, v] = oldEntries[i];
      const idx = this._bucketIndex(k, capacity);
      this._checkIndex(idx, this.buckets.length);
      this.buckets[idx].push([k, v]);
      this._size++;
    }
  }
}

// Extra credit: HashSet sencillo usando HashMap internamente
class HashSet {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this._map = new HashMap(loadFactor, initialCapacity);
  }

  add(key) {
    // solo clave
    this._map.set(key, true);
  }

  has(key) {
    return this._map.has(key);
  }

  delete(key) {
    return this._map.remove(key);
  }

  size() {
    return this._map.length();
  }

  clear() {
    this._map.clear();
  }

  values() {
    return this._map.keys();
  }
}

module.exports = { HashMap, HashSet };