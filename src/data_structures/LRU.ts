/*
 Least recently used (LRU), es una estructura utilizada para obtener el valor menos usado, 
 al obtener ese valor, indemiatamente se convierte en el usado reciente, por lo tanto lo pasamos
 al frente de la lista. Esta estructura se comporta como una double linked list en escencia pero manejaremos
 llaves y valores como lo hacen los hashmaps, esto con el fin de obtener rapidamente un elemento sin recorrer
 toda la estructura.

 --------------TESTING---------------------------

 interface ILRU<K, V> {
  update(key: K, value: V): void;
  get(key: K): V | undefined;
}

const lru = new LRU<string, number>(3) as ILRU<string, number>;

console.log(lru.get("foo"));
lru.update("foo", 69);
console.log(lru.get("foo"));

lru.update("bar", 420);
console.log(lru.get("bar"));

lru.update("baz", 1337);
console.log(lru.get("baz"));

lru.update("ball", 69420);
console.log(lru.get("ball"));
console.log(lru.get("foo"));
console.log(lru.get("bar"));
lru.update("foo", 69);
console.log(lru.get("bar"));
console.log(lru.get("foo"));

// shouldn't of been deleted, but since bar was get'd, bar was added to the front of the list, so baz became the end
console.log(lru.get("baz"));
 */

type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
  return { value };
}

export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;
  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }
  update(key: K, value: V): void {
    let node = this.lookup.get(key);
    if (!node) {
      node = createNode(value);
      this.length++;
      this.prepend(node);
      this.trimCache();
      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }
  get(key: K): V | undefined {
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }
    this.detach(node);
    this.prepend(node);
    return node.value;
  }
  private detach(node: Node<V>) {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (this.head === node) {
      this.head = this.head.next;
    }
    if (this.tail === node) {
      this.tail = this.tail.prev;
    }
    node.next = undefined;
    node.prev = undefined;
  }
  private prepend(node: Node<V>) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }
    const tail = this.tail as Node<V>;

    this.detach(tail as Node<V>);
    const key = this.reverseLookup.get(tail) as K;
    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
    this.length--;
  }
}
