angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams,$ionicHistory,AccountService) {
  $scope.myGoBack = function() {
       $ionicHistory.goBack();
 };
   AccountService.getData().then(function(data) { 
     $scope.centrales = data.data
  });
})

.controller('FotosintesisCtrl', function($scope,$state) {
  $scope.jugar = function() {
    $state.go('tab.fotosintesis-preguntas');
  }
  
  
})

.controller('ChatChartsCtrl', function($scope) {
  $scope.options = {legend: {display: true} };
  $scope.labels = ['Solar', 'Eólicas', 'Hidráulico', 'Térmicas'];
  $scope.series = ['Series A'];
  $scope.data = [5.10, 5.61, 39.69, 49.61];
})

.controller('ChatCo2globalCtrl', function($scope,AccountService) {
  AccountService.getCo2Global().then(function(data) { 
     $scope.labels = data[0];
     $scope.data = data[1];
  });
})

.controller('ChatCo2chileCtrl', function($scope,AccountService) {
  AccountService.getCo2Chile().then(function(data) { 
    $scope.series = ['Series A'];
     $scope.labels = data[0];
     $scope.data = [data[1]];
  });
})

.controller('ChatFotovolataicaCtrl', function($scope,FotoService) {
    $scope.options = {
      tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return tooltipItems.yLabel + ' kwh';
                }
            }

        },
        scales: {
            yAxes: [{
                ticks: {
                    userCallback: function(value, index, values) { return value+" kwh"; },
                    min:0,
                    max: 20

                }
            }]
        }
    };

  var ciudades = []
  ciudades = FotoService.getData()
  $scope.ciudades = ciudades
  //valor por defecto select ciudades
  $scope.ciudad = "elija"
  //Seteamos grafico por defecto correspondiente
  $scope.titulo = ciudades[0].nombre;
  $scope.labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
  $scope.data = [ciudades[0].data];
  //Seteamos accion que cambia el grafico al cambiar el select 
    $scope.update = function(item) {
    $scope.titulo = item.nombre
    $scope.data = [item.data]
}
})

.controller('FotosintesisPreguntasCtrl', function($scope,PreguntasService,$state) {

  //inicializamos el indice de la pregunta actual
  var preguntaActual = 1;
  $scope.preguntaActualIndex = preguntaActual
  //inicializamos boton de respuestas
  $scope.botonRespuesta = "Contestar"
  //inicializamos cantidad de respuestas correctas
  var correctas = 0
  $scope.correctas = correctas
  //inicializamos array de preguntas para la trivia
  var preguntas = []
  //poblamos arreglo de preguntas trivia
  preguntas = PreguntasService.getData()
  $scope.preguntas = preguntas
  //inicializamos preguntaActual
  $scope.preguntaActual = preguntas[0]
  //seteamos cantidad de preguntas
  var cantidadPreguntas = 5
  $scope.cantidad = cantidadPreguntas
  //seteamos accion del boton "contestar"
    $scope.respuesta = function(item) {
      if(item == null)
      {
         alert("Seleccione una respuesta")
      }
      else
      {

        if(item.correcta == true){
          correctas++;
          $scope.correctas = correctas
          alert("Correcta");
        }
        else{
          alert("Incorrecta");
        }
      
        //si pinchamos el boton diciendo "Finalizar redireccionamos"
      if($scope.botonRespuesta == "Finalizar"){
            PreguntasService.puntaje = correctas
            console.log(PreguntasService.puntaje)
            $state.go('tab.fotosintesis-resultado');
        };
      //sumamos 1 a la pregunta actual
      preguntaActual ++;
      //Pasamos a la siguiente pregunta
      $scope.preguntaActualIndex = preguntas[preguntaActual-1].id
      $scope.preguntaActual = preguntas[preguntaActual-1]
      console.log($scope.preguntaActual)

      //si llegamos a la ultima pregunta cambiamos el nombre del boton 
      //y redireccionamos a la pantalla final, asignamos puntaje entre otros
        if(preguntaActual == cantidadPreguntas){
          $scope.botonRespuesta = "Finalizar";
      };
      }

    }
})

.controller('FotosintesisResultadoCtrl', function($scope,$ionicNavBarDelegate,PreguntasService) {
  //ocultamos boton back para evitar volver al cuestionario
  $ionicNavBarDelegate.showBackButton(false);
  //capturamos puntaje final y dependiendo de el que obtenga desplegamos una respuesta
  //$scope.mensaje = "Te "
  $scope.total = PreguntasService.puntaje
    switch ($scope.total) {
    case 0:
        $scope.mensaje = "Te falta leer un poco, te invitamos a repasar nuestra App y volver a intentarlo"
        $scope.imagen = "bajo.jpg"
        break;
    case 1:
        $scope.mensaje = "Te falta leer un poco, te invitamos a repasar nuestra App y volver a intentarlo"
        $scope.imagen = "bajo.jpg"
        break;
    case 2:
          $scope.mensaje = "Te falta leer un poco, te invitamos a repasar nuestra App y volver a intentarlo"
          $scope.imagen = "bajo.jpg"
        break;
    case 3:
          $scope.mensaje = "No está mal, pero podrías seguir mejorando"
          $scope.imagen = "medio.jpg"
        break;
    case 4:
          $scope.mensaje = "Casi perfecto, felicitaciones"
          $scope.imagen = "alto.jpg"
        break;
    case 5:
          $scope.mensaje = "Eres la luz! ,te invitamos a compartir tu conocimiento en la categoria Semilla"
          $scope.imagen = "perfecto.jpg"
        break;
}
})

.controller('SemillaCtrl', function($scope,SemillaService,$state) {
    $scope.entidades = SemillaService.entidades
    $scope.getDetail=function(ObjectData){
    SemillaService.selected=ObjectData;
    $state.go('tab.semilla-show')
  }

})

.controller('SemillaShowCtrl', function($scope,SemillaService) {
      SemillaService.getData(SemillaService.selected).then(function(data) { 
      $scope.tipo = SemillaService.selected.tipo
      $scope.getIframeSrc = function (videoId) {
      return 'https://www.youtube.com/embed/' + videoId;
      console.log("https://www.youtube.com/embed/' + videoId")
      };
      if($scope.tipo == "Facebook"){
          $scope.posts = data.data
      }
      if($scope.tipo == "Youtube"){
          $scope.posts = data.items
      }
  });
})

.controller('ChatGlosarioCtrl', function($scope,GlosarioService,$state) {

$scope.glosario = GlosarioService.glosario
$scope.getDetail=function(ObjectData){
    GlosarioService.selected=ObjectData;
    $state.go('tab.chat-glosario-show')
  }

})

.controller('ChatGlosarioShowCtrl', function($scope,GlosarioService) {

  $scope.selected = GlosarioService.selected

});



