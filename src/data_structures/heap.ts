/*
Un minHeap es una estructura de datos similar a un arbol donde el elemento menor siempre es la cabeza y en
toda la estructura, el nodo padre siempre es menor que sus nodos hijos
*/

export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  //Metodo para insertar un elemento a la estructura
  insert(value: number): void {
    this.data[this.length] = value; // Siempre lo insertamos al final
    this.heapifyUp(this.length); // y hacemos el recorrido hacia arriba para ubicarlo
    this.length++; // Aumentamos el length de la estructura
  }
  //Metodo para eliminar un elemento
  delete(): number | undefined {
    if (this.length === 0) {
      return undefined; // si no hay elementos que eliminar devolvemos undefined
    }
    const out = this.data[0]; //Seleccionamos la cabeza de la estructura
    this.length--; // restamos uno al lenght de la estructura
    if (this.length === 0) {
      this.data = []; // Si el length es cero hacemos el reset de la estructura
      return out;
    }
    this.data[0] = this.data[this.length]; // caso contrario hacemos del ultimo elemtno la cabeza
    this.data.pop(); //Eliminamos el ultimo elemento del heap
    this.heapifyDown(0); // Hacemos el recorrido hacia abajo para ordenar la estructura
    return out; //retornamos el item eliminado
  }
  // Metodo para hacer el recorrido hacia abajo
  private heapifyDown(index: number): void {
    const leftIndex = this.leftChild(index); //sacamos el index del nodo hijo de la izquierda
    const rightIndex = this.rightChild(index); //sacamos el index del nodo hijo de la derecha
    const leftValue = this.data[leftIndex]; // obtenemos el valor del nodo de la izquierda
    const rightValue = this.data[rightIndex]; // obtenemos el valor del nodo de la derecha
    const value = this.data[index]; // obtenemos el valor del nodo current

    if (index >= this.length || leftIndex >= this.length) {
      /*
    Si el index es mayor o igual al largo del heap o si el index de la izquierda es mayor 
    al largo de la estructura hacemos el return ya que llegamos al final.
    */
      return;
    }

    if (leftValue > rightValue && value > rightValue) {
      /*
        Si el valor del nodo de izquierda es mayor al valor del nodo de la derecha y el valor del
        current es mayor al nodo de la derecha, hacemos que el valor del nodo de la derecha (el mayor), se ahora 
        el nodo padre, y hacemos del nodo previamente a la derecha el hijo en esa posicion, y pasamos recursivamente
        el arbol a partir de ese punto.
        */
      this.data[index] = rightValue;
      this.data[rightIndex] = value;
      this.heapifyDown(rightIndex);
    } else if (rightValue > leftValue && value > leftValue) {
      /*
        Si el valor del nodo de derecha es mayor al valor del nodo de la izquierda y el valor del
        current es mayor al nodo de la izquierda, hacemos que el valor del nodo de la izquierda (el mayor), se ahora 
        el nodo padre, y hacemos del nodo previamente a la izquierda el hijo en esa posicion, y pasamos recursivamente
        el arbol a partir de ese punto.
        */
      this.data[index] = leftValue;
      this.data[leftIndex] = value;
      this.heapifyDown(leftIndex);
    }
  }
  private heapifyUp(index: number): void {
    if (index === 0) {
      return; // Si el index es cero ya no hay hacia donde mas subir
    }
    const parent = this.parent(index); // Obtenemos el index del nodo padre
    const parentValue = this.data[parent]; //Obtenemos el valor del nodo padre
    const value = this.data[index]; // Obtenemos el valor del index current

    if (parentValue > value) {
      /*
        Si el valor del nodo padre es mayor al valor current, entonces hacemos el swap de posiciones, y pasamos
        index del parent de forma recursiva para seguir subiendo.
        */
      this.data[index] = parentValue;
      this.data[parent] = value;
      this.heapifyUp(parent);
    }
  }
  // Metodo para obtener el index del padre de un elemento
  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  //Metodo para obtener el index del hijo de de la izquierda de un nodo
  private leftChild(index: number): number {
    return index * 2 + 1;
  }
  //Metodo para obtener el index del hijo de la derecha de un nodo
  private rightChild(index: number): number {
    return index * 2 + 2;
  }
}
