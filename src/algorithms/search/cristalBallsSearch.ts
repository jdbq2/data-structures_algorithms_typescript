/**
 Problema: Tengo DOS esferas de cristal las cuales voy a lanzar desde un edificio
 y quiero saber cual es el menor piso en el cual se van a romper, BigO (sqrt(N)).

 El arreglo de entrada es un arreglo de booleanos lleno de false hasta que encuentra el piso
 correcto es decir el que es true, y de ahi en adelante todos los valores son true, ya que esto
 significa que desde esa altura en adelante siempre las esferas se van a romper.
 */

export const cristalBallsSearch = (floors: boolean[]): number => {
  const jumpAmount = Math.floor(Math.sqrt(floors.length)); //Hallamos la raiz cuadrada del largo del arreglo para hacer el conteo de pasos.
  let currentFloor = jumpAmount; // hacemos del valor de los salto nuestro piso actual

  for (; currentFloor < floors.length; currentFloor += jumpAmount) {
    //Recorremos el arreglo usando los pasos de la raiz cuadrada
    if (floors[currentFloor]) {
      // si encontramos un true rompemos el ciclo ya que este puede que no sea el primer true
      break;
    }
  }
  /*
  Restamos un salto al valor del piso actual, para verificar que efectivamente si es el primero o si esta intermedio
  entre los pasos que estamos dando (jumpAmount)
  */
  currentFloor -= jumpAmount;
  /*
  Recorremos el arreglo desde el punto del piso actual de forma lineal, si encontramos un true devolvemos ese valor,
  la variable J se usa para controlar que no superemos el valor del salto (jumpAmount), ya que si lo super quiere decir
  que el valor definitivamente no esta en intermedio y no existe
  */
  for (
    let j = 0;
    j <= jumpAmount && currentFloor < floors.length;
    j++, currentFloor++
  ) {
    if (floors[currentFloor]) {
      return currentFloor;
    }
  }
  // Si no encontramos ninguno devolvemos un -1 en simbolo de false
  return -1;
};

module.exports = cristalBallsSearch;
