window.addEventListener("load",function(){
      
let form = document.querySelector(".form-reg-formulario") 


    form.addEventListener("submit",function(e){
       
        e.preventDefault();

    let errores=[];

    let campoNombre= document.querySelector("#nombre");
        if(campoNombre.value==""){
            errores.push("El campo nombre no debe estar vacio")
           
        }else if(campoNombre.value.length<2){
            errores.push("El campo de nombre debe tener al menos 2 caracteres")
        }
    let campoApellido= document.querySelector("#apellido");
        if(campoApellido.value==""){
            errores.push("El campo apellido no debe estar vacio")
        }
    let campoEmail= document.querySelector("#email");
        if(campoEmail.value==""){
            
            errores.push("El campo mail no debe estar vacio")
        }else if((!campoEmail.value.indexOf ("@") != "" && (campoEmail.value.indexOf (".") ))){
            
            errores.push("Debes ingresar un email válido")
        }
    let campoAvatar= document.querySelector("#avatar");
  
        if(campoAvatar.value==""){            
            errores.push("Debes subir una imagen de perfil")
            
        }else if(!campoAvatar.value.includes(".png") ){
            console.log("ok2")
            errores.push("Debes subir un archivo válido")
        }
    let campoPassword= document.querySelector("#password")
   
        if (campoPassword.value == "" ){
              
            errores.push("Debes ingresar una contraseña ")
            
        }else if( campoPassword.value.length<4){
            errores.push("Debes ingresar una contraseña de al menos 4 caracteres")
        }
        if (errores.length>0){
            e.preventDefault();
        

    let ulErrores= document.querySelector("div.errores ul" );
        for (let i=0; i<errores.length;i++){
            ulErrores.innerHTML+="<li>"+ errores[i]+"</li>"
        }
    }
    else{form.submit()

    }

});
})


