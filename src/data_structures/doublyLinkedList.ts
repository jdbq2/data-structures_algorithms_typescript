/**
 Estructura de datos excelente para eliminar o agregar elemntos al principio o al final, pero a medida que crece,
 no es muy eficiente para buscar o eliminar en puntos intermedios, ya que el algoritmo de busqeuda siempre es de 
 BigO(n).
 */

interface LNode<T> {
  value: T;
  prev?: LNode<T>;
  next?: LNode<T>;
}

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: LNode<T>;
  private tail?: LNode<T>;
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }
  /**
  Metodo para agregar un elemento al inicio de la estructura
   */
  prepend(item: T): void {
    const node = { value: item } as LNode<T>;
    this.length++;
    /**
      Si no tenemos un head quiere decir que la estructura esta vacia por lo tanto hacemos el item la cabeza y la cola de la estructura
    */
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head; //Apuntamos el next del nodo a la cabeza actual
    this.head.prev = node; //Apuntamos el prev de la cabeza actual al nodo
    this.head = node; // hacemos que el nodo sea ahora la cabeza de la estructura
  }
  /**
  Metodo para agregar un elemento en el indice indicado de la estructura
   */
  insertAt(item: T, index: number): void {
    //Validamos que el indice enviado no se salga del length de la estructura
    if (index > this.length) {
      throw new Error("Index > List Length");
      // Si el indice es igual al length, hacemos un append
    } else if (index === this.length) {
      this.append(item);
      // Si el indice es igual cero, hacemos el prepend
    } else if (index === 0) {
      this.prepend(item);
    }
    this.length++;
    //Buscamos el nodo que se encuentra en el indice donde queremos insertar el nodo nuevo
    let curr = this.head;
    for (let i = 0; i < index && curr; i++) {
      curr = curr?.next;
    }
    curr = curr as LNode<T>;
    const node = { value: item } as LNode<T>;
    node.next = curr; // apuntamos el next del nodo nuevo a current
    node.prev = curr.prev; // apuntamos el prev del nodo al prev que tenia el current
    curr.prev = node; // hacemos de prev del current el nodo actual
    if (node.prev) {
      node.prev.next = node; //Apuntamos el next del prev del nodo insertado como el nodo, y asi hacemos la conexion en os cuatro sentidos
    }
  }
  /**
  Metodo para agregar un elemento al final de la estructura
   */
  append(item: T): void {
    const node = { value: item } as LNode<T>;
    this.length++;
    /**
      Si no tenemos un head quiere decir que la estructura esta vacia por lo tanto hacemos el item la cabeza y la cola de la estructura
    */
    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.prev = this.tail; //Apuntamos el prev del nodo a la cola actual
    this.tail.next = node; //Apuntamos el next de la cola actual al nodo
    this.tail = node; // hacemos que el nodo sea ahora la cola de la estructura
  }
  /**
  Metodo para eliminar el primer elemento que coincida en valor de la estructura
   */
  remove(item: T): T | undefined {
    let curr = this.head;
    // Recorremos la estructura para encontrar el elemento con el valor especificado como parametro
    for (let i = 0; i < this.length && curr; i++) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }
    //Si el valor no existe, hacemos un return
    if (!curr) {
      return;
    }
    // Si el valor existe lo eliminamos
    return this.removeNode(curr);
  }
  /**
  Metodo para encontrar el elemento ubucado en el index indicado
   */
  getAt(index: number): LNode<T> | undefined {
    let curr = this.head;
    //Devolvemos el valor del elemento encontrado en el index especificado como parametro
    for (let i = 0; i < index && curr; i++) {
      curr = curr.next;
    }
    return curr;
  }
  /**
  Metodo para eliminar un elemento en el indice indicado
   */
  removeAt(index: number): T | undefined {
    let curr = this.head;
    //Buscamos en la estructura el nodo correspondiente al index pasado como parametro
    for (let i = 0; i < index && curr; i++) {
      curr = curr.next;
    }
    //Si el valor no existe, hacemos un return
    if (!curr) {
      return;
    }
    // Si el valor existe lo eliminamos
    return this.removeNode(curr);
  }
  /**
  Metodo privado auxiliar creado para hacer las validaciones y eliminar el nodo que pasamos como parametro
   */
  private removeNode(node: LNode<T>): T | undefined {
    this.length--;
    // Si despues de hacer la reduccion del length es cero hacemos el reset de la estructura
    if (this.length === 0) {
      const out = this.head?.value;
      this.head = undefined;
      this.tail = undefined;
      return out;
    }
    //Si el nodo a eliminar tiene prev, hacemos que su next apunte al next del nodo que vamos a eliminar
    if (node.prev) {
      node.prev.next = node.next;
    }
    //Si el nodo a eliminar tiene next, hacemos que el prev del nodo que era el next apunte al prev del nodo a eliminar
    if (node.next) {
      node.next.prev = node.prev;
    }
    // Si el nodo a eliminar es la cabeza, hacemos que la nueva cabeza sea el nodo que era el next
    if (node === this.head) {
      this.head = node.next;
    }
    // Si el nodo a eliminar era la cola hacemos que la nueva cola sea el prev del nodo a eliminar
    if (node === this.tail) {
      this.tail = node.prev;
    }
  }
}
