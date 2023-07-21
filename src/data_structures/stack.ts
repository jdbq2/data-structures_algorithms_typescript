/**
 Esta es una estructura de datos enfocada en hacer LIFO, funciona usando una linked list de un solo
 sentido.
 */

type SNode<T> = {
  value: T;
  prev?: SNode<T>;
};

export default class Stack<T> {
  public length: number;
  private head?: SNode<T>;

  constructor() {
    this.head = undefined; //La cabeza es undefined al inicio
    this.length = 0; // El length es 0 al inicio
  }
  /*
      Metodo para ingresar un elemento al Stack 
    */
  push(item: T): void {
    this.length++; // Aumentamos el length de la estructura
    const node = { value: item } as SNode<T>; //Declaramos una variable con el item que queremos ingresar
    if (!this.head) {
      // Si no tiene head significa que esta vacio, entonces hacemos al item la cabeza de la estructura
      this.head = node;
      return;
    }
    node.prev = this.head; // caso contrario hacemos que la cabeza anterior sea el valor prev del nuevo nodo
    this.head = node; // hacemos que el elemento nuevo sea la nueva cabeza
  }
  /**
     Metodo para sacar un elemento de la estructura
     */
  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1); // Restamo uno al length y nos aseguramos que el valor nunca sea negativo
    if (this.length === 0) {
      const head = this.head; // Si el valor es cero, guardamos el head en una variable
      this.head = undefined; // Hacemos que el nuevo head sea undefined
      return head?.value; // Retornamos el valor que tenia el head previo
    }
    const head = this.head as SNode<T>; // Caso contrario guardamos el head que teniamos en una variable
    this.head = head.prev; // Hacemos que la nueva cabeza sea el valor al que apuntaba el prev del anterior head
    return head.value; //Retornamos el valor del head que borramos.
  }
  /**
     Retornamos el valor de la cabeza actual
    */
  peek(): T | undefined {
    return this.head?.value;
  }
}
