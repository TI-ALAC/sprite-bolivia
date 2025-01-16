var content3 = document.getElementById('contenido3');
var content4 = document.getElementById('contenido4');
var content5 = document.getElementById('contenido5');
var content7 = document.getElementById('contenido7');
var dat = document.getElementById('date');
var millon = document.getElementById('millones');
var title = document.getElementById('title1');
var Unidad = document.getElementById('pozoUnidad');

const URL = window.location.href;
const idPanel = 1
const province = "ecuador"
// const idPanel = 17
// const province = "lima"
console.log(URL.split("?province="))
document.getElementById("img-province-nublado").src="img/"+province+"/nublado.jpg"
document.getElementById("img-province-soleado").src="img/"+province+"/Soleado.jpg"
document.getElementById("img-province-lluvia").src="img/"+province+"/lluvia.jpg"
document.getElementById("img-province-parcialmentenublado").src="img/"+province+"/parcialmentenublado.jpg"

async function init() {
  const coord = await axios.get(`https://apialacplayer.alacoohbolivia.com/playlist/panel/${idPanel}`);
  var latitud = coord.data.data[0].point.coordinates[0];
  var longitud = coord.data.data[0].point.coordinates[1];
  const response = await axios.get(`https://weatherstation.alacoohperu.pe/api/clima/${latitud}/${longitud}`);
  //const response2 = await axios.get(`https://weatherstation.alacoohperu.pe/api/climagrados/${latitud}/${longitud}`);
  const text_clima = response.data.data.weather[0].description;
  console.log(text_clima)
  const datatemp = response.data.data.main.temp.toFixed(0);
  const result = datatemp.toString();
  const fecha = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEs = fecha.toLocaleDateString('es-ES', options);
  const palabras = dateEs.split(",");
  const palabraDia = palabras[0][0].toUpperCase() + palabras[0].substr(1);
  const palabraFecha = palabras[1];
  const unir = palabraDia + "," + palabraFecha;
  document.getElementById('title1').innerHTML = result;

  if (text_clima == 'niebla' || text_clima == 'muy nuboso' || text_clima == 'bruma' ) {
    content3.style.display = "block";
  } else if (text_clima == 'cielo claro' || text_clima == 'algo de nubes'|| text_clima == 'nubes dispersas') {
    content4.style.display = "block";
    
  } else if (text_clima == 'lluvia ligera' || text_clima == 'tormenta con lluvia ligera'|| text_clima == 'lluvia moderada' || text_clima == 'tormenta' || text_clima == 'tormenta con lluvia intensa' || text_clima == 'tormenta con lluvia' || text_clima == 'llovizna ligera' || text_clima == 'llovizna moderada' || text_clima == 'llovizna' || text_clima == 'tormentas eléctricas dispersas'|| text_clima == 'chubascos'|| text_clima == 'llovizna débil') {
    content5.style.display = "block";

  }else if (text_clima == 'nubes') {
    content7.style.display = "block";
  }

}

init();
