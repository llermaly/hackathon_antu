angular.module('starter.services', [])

.service('AccountService', function($http){
  this.getData= function() {
      var url = "http://energiamaps.cne.cl/datastreams/invoke/w61PlQ8oFJxx-mnXFQpMOTk1WE_KQRexkH0IncmmzkU";
      return $http.get(url).then(function(response) {
          return response.data;
      });
  }
  this.getCo2Global= function() {
      var countries = [];
      var values = [];
      var url = "http://api.worldbank.org/countries/all/indicators/EN.ATM.CO2E.PC?format=json&date=2013&per_page=9999";
      return $http.get(url).then(function(response) {
      response.data[1].forEach(function (value, i) {
          //quitamos de la lista aquellos que no son paises
          if (i >  46 && value != null ){ 
            countries.push(value.country.value)
            values.push(value.value)
          }

      });          
          return [countries,values];
      });
  }
  this.getCo2Chile= function() {
      var years = [];
      var values = [];
      var url = "http://api.worldbank.org/countries/cl/indicators/EN.ATM.CO2E.PC?format=json&date=1960:2013&per_page=9999";
      return $http.get(url).then(function(response) {
      response.data[1].forEach(function (value, i) {
            years.push(value.date)
            values.push(value.value)
      });          
          return [years,values];
      });
  }
})


.service('FotoService', function(){
//Servicio que simula response de Enlace Solar 
var ciudades = [];
  ciudades = [
    {id:"1", nombre:"Santiago",diario: 0.41,factor: 17.1, data: [16.4,14.5,14.8,12.1,9.5,8.0,8.7,9.6,11.6,13.9,14.9,16.1]},
    {id:"2", nombre:"Calama",diario: 0.57,factor: 23.9, data: [18.2,16.8,18.5,17.1,16.5,15.2,16.1,17.3,18.0,19.2,18.4,18.3]},
    {id:"3",nombre:"Punta Arenas",diario: 0.41,factor: 17.1, data: [12.6,10.5,9.3,7.0,5.5,3.9,4.8,6.3,8.6,11.6,11.8,13.4]}
  ]

  this.getData  = function(){
    return ciudades;
  }
})

.service('PreguntasService', function(){
//Servicio que genera preguntas
//ToDo : Algoritmos de generacion automatica
//cada categoria tendra un algoritmo para generar la pregunta
//glosario = tomar una pregunta al azar del glosario y mezclarla con otras definiciones para generar alternativas
//Emision de CO2 = tomar paises y valores para generar preguntas de comparacion
//Capacidad fotovoltaica = Comparacion entre ciudades y meses
//Plantas solares = utilizacion de API para preguntar por nombres,ubicaciones,potencia de las plantas solares
this.puntaje;
var preguntas = [];
  preguntas = [
    {id:"1", texto:"Cuanto % de generacion solar tenemos?",categoria: "Generacion Solar", alternativas: [
      {texto: "5.1%", correcta: true},
      {texto: "8.9%", correcta: false},
      {texto: "8.1%", correcta: false}
    ]},
    {id:"2", texto:"Cuanto CO2 emite Chile per capita?",categoria: "Emisión CO2", alternativas: [
      {texto: "5.5 ton metricas", correcta: false},
      {texto: "4.73 ton metricas", correcta: true},
      {texto: "2.39 ton metricas", correcta: false}
    ]},
    {id:"3", texto:"Donde y cuando hay mas potencial solar?",categoria: "Capacidad Fotovoltaica", alternativas: [
      {texto: "Calama durante junio", correcta: false},
      {texto: "Punta Arenas durante diciembre", correcta: false},
      {texto: "Santiago durante enero", correcta: true}
    ]},
    {id:"4", texto:"Cuantas plantas solares hay en la V region?",categoria: "Plantas Solares", alternativas: [
      {texto: "0 ", correcta: true},
      {texto: "1", correcta: false},
      {texto: "2", correcta: false}
    ]},
    {id:"5", texto:"Es el sol una energía limpia, confiable, segura y competitiva?",categoria: "Glosario", alternativas: [
      {texto: "SI", correcta: true},
      {texto: "NO", correcta: false},
      {texto: "Tal vez", correcta: false}
    ]}
  ]
  console.log(preguntas)

  this.getData  = function(){
    return preguntas;
  }

})

.service('SemillaService', function($http){

//Servicio que trae datos de Facebook/Youtube
  this.getData = function(item) {
      var url = item.url
      return $http.get(url).then(function(response) {
          return response.data;
          console.log(response.data)
      });
  }
  this.entidades = [ 
  {id:1,nombre:"Ministerio de Energía",tipo:"Facebook",img:"face.png", url: "https://graph.facebook.com/minenergia/posts?fields=id,picture,full_picture,message,created_time,type,object_id&access_token=1678197205827427%7C586b1e641555373aa93257117f1ddda5"},
  {id:2,nombre:"Comisión Nacional de Energía",tipo:"Youtube",img:"youtube.png",url: "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCqxxeIDdZ_rMmFTBunRt0fA&maxResults=25&key=AIzaSyAJKM-AnMseXYP6JbT1OaCwqzc-W9J4rB4"}
]
  this.selected = {}

})

.service('GlosarioService', function(){

//Servicio que maneja glosario
  this.glosario = [

{texto: "¿Qué es un panel solar?", respuesta: "Un panel solar es un conjunto de células fotovoltaicas conectadas en serie y protegidas por dos superficies, una de cristal y la otra de poliéster, acetato de vinilo u otros materiales."},
{texto: "¿Qué condiciones son las mejores para que las (PV) produzcan electricidad?", respuesta: "Las células (PV) funcionan mejor en climas fríos. Al contrario de lo que la mayor parte de la gente cree, los sistemas fotovoltaicos generan más potencia a menor temperatura."},
{texto: "¿Qué beneficio económico puedo llegar a obtener si instalo un panel solar en mi tejado?", respuesta: "Un panel solar puede producir en electricidad una bonita cantidad para restar de la Ud. normalmente consume."},
{texto: "A pesar del costo debemos los ciudadanos apostar por las energías renovables?", respuesta: "Si, porque la energía solar fotovoltaica generada en su propia vivienda es su propia energía, y son las renovables las energías más limpias que existen."},
{texto: "Energéticamente, ¿la fabricación de un Panel Solar cuesta más de lo que vaya a producir?", respuesta: "Desde luego que no, no tendría objeto su fabricación si fuera a costar más de lo que es capaz de producir."},
{texto: "Qué es mejor, comprar la energía como hacemos hasta ahora? o instalar PV?", respuesta: "Es mejor instalarlos, así está seguro de que la energía que Vd. consume es 'verde'."}
]

  this.selected = {}
});