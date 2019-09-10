     document.getElementById('registroEstudiantes').addEventListener('click', function(){
            registrarEstudiantes();
            dibujarTablaEstudiantes();       
    });

    document.getElementById("promedioEstudiantes").addEventListener('click', function(){
        promedioEstudiantes();
    });

    document.getElementById("notaMayorEstudiantes").addEventListener('click', function(){
        notaMayor();
    });

    document.getElementById("notaMenorEstudiantes").addEventListener('click', function(){
        notaMenor();
    });
        
    var estudiantes = [];   

function registrarEstudiantes(){/*obtengo los datos del usuario, valida si los campos numeros son numeros y luego llama a la funcion
    agregarEstudiante y le pasa los valores enviados por el usuario. Luego se llama a la funcion que crea la tabla*/

    var codigo_estudiante = parseInt(document.getElementById('codigo').value);
    var nombre_estudiante = document.getElementById('nombre').value;
    var nota_estudiante = parseInt(document.getElementById('nota').value);


        if(validarCodigoEstudiante(codigo_estudiante) && validar(codigo_estudiante) && validar(nota_estudiante) && validarNombre(nombre_estudiante)){
                agregarEstudiante(codigo_estudiante, nombre_estudiante, nota_estudiante);
                dibujarTablaEstudiantes();     
        }else{
            alert('Debe completar todos los campos y el Codigo no puede repetirse!');
            return false;            
        }
    }

function dibujarTablaEstudiantes(){//funcion que dibuja la tabla
    
    var lista = obtenerEstudiante();//Obtengo el estudiante

    var tabla = document.querySelector('#tablaEstudiantes tbody');//Selecciono el tbody donde voy a insertar los valores

    tabla.innerHTML = '';//Set para vaciar el campo y no tener valores duplicados

    for(var i = 0; i < lista.length; i++){//recorro los estudiantes
        var row = tabla.insertRow(i);//Inserto una Fila por cada estudiante
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

            cell1.innerHTML = lista[i].codigo;
            cell2.innerHTML = lista[i].nombre;
            cell3.innerHTML = lista[i].nota;
            
            tabla.appendChild(row);
    }
}

function agregarEstudiante(codigo_estudiante, nombre_estudiante, nota_estudiante){//obtengo los valores introducidos por el usuario
    var nuevo_estudiante = {//Json con valores introducidos por el usuario
        codigo:codigo_estudiante,
        nombre:nombre_estudiante,
        nota:nota_estudiante
    };
        
            estudiantes.push(nuevo_estudiante);//agrego el Json al Array Estudiantes
            localStorageEstudiantes(estudiantes);//Almaceno en local a los estudiantes a traves de la funcion
    
}

function obtenerEstudiante(){//Obtengo el estudiante almcenado en local
    
    var listaAlmacenada = localStorage.getItem('localEstudiantesList');

    if(listaAlmacenada == null){//si está vacío devuelvo el Array vacío
        estudiantes = [];
    }else{
        estudiantes = JSON.parse(listaAlmacenada);//de lo contrario parseo el Estudiante para mostrarlo correctamente
    }

    return estudiantes;
}

function localStorageEstudiantes(elist){

    localStorage.setItem('localEstudiantesList', JSON.stringify(elist));//devuelve el estudiante almacenado en local

}

function promedioEstudiantes(){
    
    var out = "";
    var total = 0;
    var promedio = 0;

    for(var i =0; i < estudiantes.length; i++){ 
        total += estudiantes[i].nota;
        promedio = total / estudiantes[i].codigo; 
    }

    document.getElementById('resultado').innerHTML = "El promedio de los estudiantes ingresados es: " + promedio;

}

function notaMayor(){
    
    var out = "";
    var nota_mayor = estudiantes[0].nota;
    var nombreEstudiante = estudiantes[0].nombre;

    for(var i = 0; i < estudiantes.length; i++){
            if(nota_mayor < estudiantes[i].nota){
                nota_mayor = estudiantes[i].nota;
                nombreEstudiante = estudiantes[i].nombre;
            }
        out = "El estudiante con la nota Mayor es: " + nombreEstudiante + " y su nota es: " + nota_mayor;
        document.getElementById('resultadoNotaMayor').innerHTML = out;    
    }
}

function notaMenor(){
    
    var out = "";
    var nota_menor = estudiantes[0].nota;
    var nombreEstudiante = estudiantes[0].nombre;

    for(var i = 0; i < estudiantes.length; i++){
        if(nota_menor > estudiantes[i].nota){
            nota_menor = estudiantes[i].nota;
            nombreEstudiante = estudiantes[i].nombre;
        }

        out = "El estudiante con la nota menor es: " + nombreEstudiante + " y su nota es: " + nota_menor;
        document.getElementById('resultadoNotaMenor').innerHTML = out;
    }
}

  /***************/
 /*Validaciones**/                       
/***************/  
 

function validar(num){//funcion que valida si el codigo y la nota ingresado es un número 
    
    if(isNaN(num)){

        alert("En los campos código y nota debe ingresar únicamente números!");

        return false;

    }else{

        return true;
    }
    
}



function validarNombre(nom){
   
    nom = document.getElementById('nombre').value;

        if(nom == null || nom.length == 0 || /^\s+$/.test(nom)){
       
            return false;

        }else{

            return true;
    }
}

function validarCodigoEstudiante(cod){

    var x;
    var codEst = 0;
 
    if(typeof estudiantes != "undefined" && estudiantes != null && estudiantes.length != null && estudiantes.length > 0){
 
        for(x in estudiantes){
 
            codEst = estudiantes[x]['codigo'];    
 
            if(cod == codEst){
 
                alert("No pueden haber dos estudiantes con el mismo codigo!");
 
                return false;
            }
        }

        return true;      
    
    } else {

      return true;
    }
 }

    
    




