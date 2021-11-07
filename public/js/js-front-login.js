window.addEventListener("load",function(){
      
    let form = document.querySelector(".form-login-formulario") 
    
    
        form.addEventListener("submit",function(e){
           
            e.preventDefault();
    
        let errores=[];
    
        let campoEmail= document.querySelector("#email");
       
            if(campoEmail.value ==""){
                console.log ("ok")
                errores.push("El campo mail no debe estar vacio")
            }else if(!campoEmail.value.indexOf ("@") ){
                
                errores.push("Debes ingresar un email válido")
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
    
    
    