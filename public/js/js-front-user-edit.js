window.addEventListener("load",function(){
      
    let form = document.querySelector(".tm-edit-product-form") 
    
    
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