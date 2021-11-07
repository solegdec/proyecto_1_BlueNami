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
        let campoPrecio= document.querySelector("#precio");
            if(campoPrecio.value==""){
                errores.push("El campo precio no debe estar vacio")
            }

            let campoDescripcion= document.querySelector("#descripcion");
            if(campoDescripcion.value==""){
                errores.push("El campo descripcion no debe estar vacio")
            }

            let campoUnidades= document.querySelector("#unidades");
            if(campoUnidades.value==""){
                errores.push("El campo unidades no debe estar vacio")
            }


        let campoFoto= document.querySelector("#foto");
      
            if(campoFoto.value==""){            
                errores.push("Debes subir una foto del producto")
                
            }else if(!campoFoto.value.includes(".png") ){
                console.log("ok2")
                errores.push("Debes subir un archivo válido")
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