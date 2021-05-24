/*Función que carga el local storage con los datos json */
function CargarLocalStorage(){
  var datosvotos = {
    "datos" : [
        {
            "nombre" : " Kanye West " ,
            "description" : " Nacido en Atlanta y criado en Chicago, West fue conocido por primera vez como productor de Roc-A-Fella Records a principios de la década de 2000, produciendo singles para varios artistas de la corriente principal. " ,
            "categoría" : " entretenimiento " ,
            "imagen" : " kanye.png " ,
            "lastUpdated" : " 2020-03-10T23: 08: 57.892Z " ,
            "votos" : {
                "positivo" : 0 ,
                "negativo" : 0
            }
        },
        {
            "nombre" : " Mark Zuckerberg " ,
            "description" : " Nacido en White Plains, Nueva York, Zuckerberg asistió a la Universidad de Harvard, donde lanzó el servicio de redes sociales Facebook desde su dormitorio el 4 de febrero de 2004. " ,
            "categoría" : " empresa " ,
            "imagen" : " marca.png " ,
            "lastUpdated" : " 2021-02-14T23: 10: 19.134Z " ,
            "votos" : {
                "positivo" : 0 ,
                "negativo" : 0
            }
        },
        {
            "nombre" : " Cristina Fernández de Kirchner " ,
            "description" : " Su primer mandato comenzó con un conflicto con el sector agrícola y su propuesta de sistema tributario fue rechazada " ,
            "categoría" : " política " ,
            "imagen" : " cristina.png " ,
            "lastUpdated" : " 2020-12-10T23: 41: 07.120Z " ,
            "votos" : {
                "positivo" : 0 ,
                "negativo" : 0
            }
        },
        {
          "nombre": "Malala Yousafzai",
          "description": "The daughter of educational activist Ziauddin, Yousafzai was born to a Pashtun family in Mingora, Khyber Pakhtunkhwa, Pakistan. Her family came to run a chain of schools in the region.",
          "categoría": "politics",
          "imagen": "malala.png",
          "lastUpdated": "2020-12-10T23:41:07.120Z",
          "votos": {
              "positivo": 0,
              "negativo": 0
          }
      },
      {
          "nombre": "Elon Musk",
          "description": "In 2002, Musk founded SpaceX, an aerospace manufacturer and space transport services company, of which he is CEO, CTO, and lead designer.",
          "categoría": "business",
          "imagen": "elon.png",
          "lastUpdated": "2020-12-20T23:43:38.041Z",
          "votos": {
              "positivo": 0,
              "negativo": 0
          }
      },
      {
          "nombre": "Greta Thumberg",
          "description": "Thunberg's activism started after convincing her parents to adopt several lifestyle choices to reduce their own carbon footprint.",
          "categoría": "environment",
          "imagen": "greta.png",
          "lastUpdated": "2021-02-26T23:44:50.326Z",
          "votos": {
              "positivo": 0,
              "negativo": 0
          }
      }
    ]
  }
  
  localStorage.setItem('datosvotos', JSON.stringify(datosvotos));
  CargarLocalStorage = function(){};
};

CargarLocalStorage();


function EnviarVoto(indice, boton){
  if(boton.innerHTML == "Vote Again"){
    document.getElementById("btnvote"+indice).innerHTML = "Vote Now";
    document.getElementById("btnlike" + indice).style.visibility = "visible";
    document.getElementById("btnlike" + indice).style.borderColor = "black";
    document.getElementById("btndislike" + indice).style.visibility = "visible";
    document.getElementById("btndislike" + indice).style.borderColor = "black";
    document.getElementById("lblceja"+indice).value = "";
    boton.disabled = true;
    
  }
  else{
    if(document.getElementById(("btnlike") + indice).style.borderColor == "white"){ //like
      Votar(indice,1);
    }
    else{
      Votar(indice,0);
    }
  }
 
}

function Votar(indice,tipo){
    var datos = localStorage.getItem("datosvotos");
    var json = JSON.parse(datos);
    var votospositivos = json.datos[indice].votos.positivo;
    var votosnegativos = json.datos[indice].votos.negativo;
    if(tipo == 0){ //negativo
      votosnegativos ++;
      json.datos[indice].votos.negativo = votosnegativos;
    }
    else{ //positivo
      votospositivos ++;
      json.datos[indice].votos.positivo = votospositivos;
    }
    localStorage.setItem('datosvotos', JSON.stringify(json));

    VisualizarVotos(indice,votospositivos, votosnegativos);

    //Actualizar texto del botón
    document.getElementById("btnvote"+indice).innerHTML = "Vote Again";
    document.getElementById("btnlike" + indice).style.visibility = "hidden";
    document.getElementById("btndislike" + indice).style.visibility = "hidden";
    document.getElementById("lblceja"+indice).value = "Thank you for your vote!";

    //Actualziar el estado general de votación
    if(votospositivos > votosnegativos){
      document.getElementById("btnestado"+indice).style.visibility = "visible";
      document.getElementById("btnestado"+indice).className = "BotonPositivoVotacion";
      document.getElementById("imgestado"+indice).className = "img_positivo"
    }
    else if(votosnegativos > votospositivos){
      document.getElementById("btnestado"+indice).style.visibility = "visible";
      document.getElementById("btnestado"+indice).className = "BotonNegativoVotacion";
      document.getElementById("imgestado"+indice).className = "img_negativo"
    }
    else{
      document.getElementById("btnestado"+indice).style.visibility = "hidden";
    }

}

function VisualizarVotos(indice, positivos, negativos){
      var barralikes = document.getElementById("likes"+indice);
      var labellikes = document.getElementById("lbllikes"+indice);
      var barradislikes = document.getElementById("dislikes"+indice);
      var labeldislikes = document.getElementById("lbldislikes"+indice);

      var total = positivos + negativos;
      var porc_positivos = ((positivos*100)/total);
      var porc_negativos = ((negativos*100)/total);
      if (porc_positivos % 1 != 0) { 
        porc_positivos = porc_positivos.toFixed(2);
      }

      if (porc_negativos % 1 != 0) { 
        porc_negativos = porc_negativos.toFixed(2);
      }

      barralikes.style.width = porc_positivos + "%";
      barradislikes.style.width = porc_negativos + "%";
      labellikes.value = porc_positivos + "%";
      labeldislikes.value = porc_negativos + "%";
      if(porc_positivos == 100){
        document.getElementById("dislikes" + indice).style.visibility = "hidden";
      }
      else if(porc_negativos == 100){
        document.getElementById("likes" + indice).style.visibility = "hidden";
      }
      else{
        document.getElementById("dislikes" + indice).style.visibility = "visible";
        document.getElementById("likes" + indice).style.visibility = "visible";
      }
}

function ActivarBoton(tipo,indice){
  if(tipo == 0){ //dislike
    var btn = document.getElementById("btndislike"+indice);
    var otro_btn = document.getElementById("btnlike"+indice);
  }
  else{
    var btn = document.getElementById("btnlike"+indice);
    var otro_btn = document.getElementById("btndislike"+indice);
  }
  
  btn.style.borderColor = "white";
  otro_btn.style.borderColor = "black";
  document.getElementById("btnvote"+ indice).disabled = false;
}

function CambioVisualizacion(combo){
  var index = combo.selectedIndex;
  if(index == 0){ //lista
      document.getElementById("contenedorvotos").className = "grid-container-lista";
      
  }
  else{
    document.getElementById("contenedorvotos").className = "grid-container-cuadricula";
  }


}
