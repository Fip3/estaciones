class estacion {
  constructor(nombre, inicio, termino) {
    this.nombre = nombre;
    this.inicio = inicio;
    this.termino = termino;
  }

  get loQueQueda() {
    return this.calcProp();
  }

  calcProp() {
    var a = Date.now();
    var t = new Date(this.termino);
    var i = new Date(this.inicio);
    return (t - a)/(t - i);
  }
}

var estaciones = [
  {
    nombre: "Invierno",
    inicio: "2017-06-21T04:24:00.000Z",
    termino: "2017-09-22T20:02:00.000Z"
  },
  {
    nombre: "Primavera",
    inicio: "2017-09-22T20:02:00.000Z",
    termino: "2017-12-21T16:28:00.000Z"
  },
  {
    nombre: "Verano",
    inicio: "2017-12-21T16:28:00.000Z",
    termino: "2018-03-20T16:15:00.000Z"
  }
]

function proporcion() {

  var indice = 0;

  var t = new Date(estaciones[indice].termino);

  for( var i = 0; i < estaciones.length; i++) {
    if (Date.now() < t.getTime()) {
      indice = i;
      break
    } else {
      t = new Date(estaciones[i+1].termino);
    }
  }

  var season = new estacion(
    estaciones[indice].nombre,
    estaciones[indice].inicio,
    estaciones[indice].termino);

  var textoFaltante = document.getElementById("faltante");
  var textoEstacion = document.getElementById("estacion");

  var salida = parseFloat(season.loQueQueda*100).toFixed(6);

  textoEstacion.innerHTML = season.nombre;
  textoFaltante.innerHTML = salida;

}

function iniciar(){
  setInterval(proporcion,1000);
}
