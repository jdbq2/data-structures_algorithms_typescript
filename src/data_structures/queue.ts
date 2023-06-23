/**
 Esta es una estructura de datos enfocada en hacer FIFO, funciona usando una linked list de un solo
 sentido y solo se debe seleccionar el primer elemento del Queue.
 */

type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export default class Queue<T> {
  public length: number;
  private head?: QNode<T>;
  private tail?: QNode<T>;

  constructor() {
    this.head = undefined; //La cabeza es undefined al inicio
    this.tail = undefined; // la cola es undefined al incio
    this.length = 0; // El length es 0 al inicio
  }

  /**
    Metodo para ingresar un elemento al Queue 
   */
  enqueue(item: T): void {
    this.length++; // Aumentamos el length de la estructura
    const node = { value: item } as QNode<T>; //Declaramos una variable con el item que queremos ingresar
    if (!this.tail) {
      // Si no tiene cola significa que esta vacio, entonces hacemos al item, cola y cabeza
      this.tail = node;
      this.head = node;
      return;
    }
    this.tail.next = node; // caso contrario hacemos que la cola actual apunte al elemento nuevo
    this.tail = node; // hacemos que el elemento nuevo sea la nueva cola
  }
  /**
   Metodo para sacar un elemento de la estructura
   */
  dequeue(): T | undefined {
    if (!this.head) {
      return undefined; // Si no hay cabeza, no hay nada que sacar, devolvemos undefined.
    }
    this.length--; // Caso contrario restamos uno de la estructura de datos.
    const head = this.head; //Creamos una variable con el valor de la cabeza actual
    this.head = this.head.next; //Hacemos que la nueva cabeza sea el elemnto al que apuntaba la cabeza anterior
    if (this.length === 0) {
      this.tail = undefined; // Si el length es cero, quiere decir que la estructura esta vacia.
    }
    return head.value; // Retornamos el valor de la cabeza Que sacamos
  }
  /**
   Retornamos el valor de la vabeza actual
   */
  peek(): T | undefined {
    return this.head?.value;
  }
}
