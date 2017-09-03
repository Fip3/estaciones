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

  for (var i = 0; i < estaciones.length; i++) {
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

  fondo("bg", season.loQueQueda, season.nombre);
}

function fondo(id, proporcion, estacion) {
  var colores = [
    {
      nombre: "Invierno",
      rojo: 255,
      verde: 204,
      azul: 51
    },
    {
      nombre: "Primavera",
      rojo: 204,
      verde: 153,
      azul: 102
    },
    {
      nombre: "Verano",
      rojo: 102,
      verde: 153,
      azul: 204
    },
    {
      nombre: "Otoño",
      rojo: 255,
      verde: 102,
      azul: 102
    }
  ];

  var elegido = false;
  var indice;
  if (proporcion < 0.5) {
    indice = 3;
  } else {
    indice = 4;
  };

  var color1 = "";
  var color2 = "";

  while (!elegido) {
    var i = indice % 4;
    if (colores[i].nombre == estacion) {
      elegido = true;
      r1 = colores[i].rojo;
      r2 = colores[i+1].rojo;
      v1 = colores[i].verde;
      v2 = colores[i+1].verde;
      a1 = colores[i].azul;
      a2 = colores[i+1].azul;
    };
    indice++;
  }

  var color, rojo, verde, azul;

  rojo = mezcla(proporcion, r1, r2);
  verde = mezcla(proporcion, v1, v2);
  azul = mezcla(proporcion, a1, a2);

  color = "rgb(" + rojo + ", " + verde + ", " + azul + ")";

  document.getElementById(id).style.backgroundColor = color;
}

function mezcla(proporcion, valor1, valor2) {
  var p;
  if (proporcion < 0.5) {
    p = proporcion - 0.5;
    valor = Math.floor( valor1 * p + valor2 * (1 - p)).toString();
  } else {
    p = proporcion + 0.5;
    valor = Math.floor( valor2 * p + valor1 * (1 - p)).toString();
  };
  return valor;
}

function iniciar() {
  proporcion();
  setInterval(proporcion,100);
}
