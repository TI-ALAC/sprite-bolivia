var content3 = document.getElementById('contenido3');
var content4 = document.getElementById('contenido4');
var content5 = document.getElementById('contenido5');
var dat = document.getElementById('date');
var millon = document.getElementById('millones');
var title = document.getElementById('title1');
var Unidad = document.getElementById('pozoUnidad');

const idPanel = 1
const province = "ecuador"
function updateImage() {
  const imgNublado = document.getElementById('img-province-nublado');
  const imgSoleado = document.getElementById('img-province-soleado');
  const imgLluvia = document.getElementById('img-province-lluvia');

  if (window.innerWidth <= 480) {
    imgNublado.src = `img/${province}/nublado-cuadrada.jpg`;
    imgSoleado.src = `img/${province}/Soleado-cuadrada.jpg`;
    console.log("imgSoleado.src",imgSoleado.src)
    imgLluvia.src = `img/${province}/lluvia-cuadrada.jpg`;
  } else if (window.innerWidth <= 768) {
    imgNublado.src = `img/${province}/nublado.jpg`;
    imgSoleado.src = `img/${province}/Soleado.jpg`;
    imgLluvia.src = `img/${province}/lluvia.jpg`;
  } 
}

async function init() {
  const coord = await axios.get(`https://apialacplayer.alacoohbolivia.com/playlist/panel/${idPanel}`);
  var latitud = coord.data.data[0].point.coordinates[0];
  var longitud = coord.data.data[0].point.coordinates[1];
  const response = await axios.get(`https://weatherstation.alacoohperu.pe/api/clima/${latitud}/${longitud}`);
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

  if (text_clima == 'niebla' || text_clima == 'muy nuboso' || text_clima == 'bruma' || text_clima == 'nubes' ) {
    content3.style.display = "block";
  } else if (text_clima == 'cielo claro' || text_clima == 'algo de nubes'|| text_clima == 'nubes dispersas') {
    content4.style.display = "block";
    
  } else if (text_clima == 'lluvia ligera' || text_clima == 'tormenta con lluvia ligera'|| text_clima == 'lluvia moderada' || text_clima == 'tormenta' || text_clima == 'tormenta con lluvia intensa' || text_clima == 'tormenta con lluvia' || text_clima == 'llovizna ligera' || text_clima == 'llovizna moderada' || text_clima == 'llovizna' || text_clima == 'tormentas eléctricas dispersas'|| text_clima == 'chubascos'|| text_clima == 'llovizna débil') {
    content5.style.display = "block";

  }

}

window.addEventListener('resize', updateImage);
window.addEventListener('load', updateImage);
init();
