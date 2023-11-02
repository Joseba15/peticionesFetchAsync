document.addEventListener("DOMContentLoaded", async function () {
    // Obtenemos los elementos html que vamos necesitar, el formulario y la lista
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const url = 'http://localhost:3000/users';
  
    
    // Función para validar email
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
    
   function createLi (nombre,direccion,correo) {
        const li = document.createElement('li');
        li.innerHTML=`${user.nombre} : ${user.direccion} : ${user.correo} : <button class="delete" data-id=${user.id} >Eliminar</button> 
        <button data-id=${user.id} class="edit">Editar</button> `;
        userList.appendChild(li);
   }
    
  
    // Metodo GET para devolver todos los usuarios cargados del servidor 
    let users =  await getUsers();
    for (const user of users) {
        createLi(user)
    }




    
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
             
        const user = { nombre : document.getElementById("name").value,
                          direccion : document.getElementById("address").value,
                          correo : document.getElementById("email").value 
        }
       
        
  
  
        if (user.nombre && user.direccion && validateEmail(email)) {
          // if ( true ) {     //Pendiente de modificacion

            // Crea el nuevo elemento de la lista con los nuevos datos
            const listItem = addUserToList(user)
    
            // Comprobar si estamos editando un usuario
            if (userForm.dataset.editing) {
            //   // Recuperamos el email que estamos editando y el índice del elemento de la lista
            //   // const oldEmail = userForm.dataset.editing;
            //   const editingIndex = parseInt(userForm.dataset.editingIndex);
    
            //   // Reemplaza el elemento existente en el índice con el nuevo elemento
            //   userList.replaceChild(listItem, userList.children[editingIndex]);
            //   userForm.removeAttribute("data-editing"); 
              
            }

            // En este caso vamos a añadir el usuario creado al servidor mediante la peticion POST
            else {
               postUser(user);

            }

            userForm.reset(); 
            userForm.querySelector("button[type='submit']").textContent = "Agregar Usuario"; 
          }
          else {
            alert('El email especificado ya existe en la lista');
          }
        //  }
        // else {
        //   alert('Alguno de los campos no es correcto');
        // }
    });
  

    async function getUsers() {
        try {
            const res = await fetch(url)
            const users = await res.json();
            return users;
            
        } catch (error) {
            
        }
    }
  
    async function postUser(user) {
        try{
        const res = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
                }
            })
            
        let  userAdded = await res.json();
        return userAdded;
        }catch(err){
            console.error(err)
            return;
        }
    }
    
  
});
  