class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
      this.capacity = capacity;
      this.loadFactor = loadFactor;
      this.buckets = new Array(this.capacity);
      this.size = 0;
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        this.buckets[index] = [];
      }
  
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
          return;
        }
      }
  
      this.buckets[index].push([key, value]);
      this.size++;
  
      if (this.size / this.capacity >= this.loadFactor) {
        this.resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      if (this.buckets[index]) {
        for (let i = 0; i < this.buckets[index].length; i++) {
          if (this.buckets[index][i][0] === key) {
            return this.buckets[index][i][1];
          }
        }
      }
      return null;
    }
  
    has(key) {
      const index = this.hash(key);
      if (this.buckets[index]) {
        for (let i = 0; i < this.buckets[index].length; i++) {
          if (this.buckets[index][i][0] === key) {
            return true;
          }
        }
      }
      return false;
    }
  
    remove(key) {
      const index = this.hash(key);
      if (this.buckets[index]) {
        for (let i = 0; i < this.buckets[index].length; i++) {
          if (this.buckets[index][i][0] === key) {
            this.buckets[index].splice(i, 1);
            this.size--;
            return true;
          }
        }
      }
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = new Array(this.capacity);
      this.size = 0;
    }
  
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
          if (bucket) {
            for (const [key] of bucket) {
              keys.push(key);
            }
          }
        }
        return keys;
      }
  
    values() {
      const values = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [, value] of bucket) {
            values.push(value);
          }
        }
      }
      return values;
    }
  
    entries() {
      const entries = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) {
            entries.push(entry);
          }
        }
      }
      return entries;
    }
  
    resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            this.set(key, value);
          }
        }
      }
    }
  }
  
  // Test the HashMap
  const test = new HashMap(16, 0.75);
  
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
  
  console.log("Initial HashMap:");
  console.log("Length:", test.length());
  console.log("Capacity:", test.capacity);
  
  test.set('apple', 'dark red');
  test.set('banana', 'bright yellow');
  console.log("After overwriting:");
  console.log("Length:", test.length());
  console.log("Capacity:", test.capacity);
  
  test.set('moon', 'silver');
  console.log("After resizing:");
  console.log("Length:", test.length());
  console.log("Capacity:", test.capacity);
  
  test.set('moon', 'shining silver');
  test.set('dog', 'dark brown');
  
  console.log("Get 'apple':", test.get('apple'));
  console.log("Has 'carrot':", test.has('carrot'));
  console.log("Remove 'kite':", test.remove('kite'));
  console.log("Length:", test.length());
  console.log("Keys:", test.keys());
  console.log("Values:", test.values());
  console.log("Entries:", test.entries());
  
  test.clear();
  console.log("After clear:");
  console.log("Length:", test.length());