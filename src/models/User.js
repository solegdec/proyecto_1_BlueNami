const fs = require('fs');
const path=require ("path");
 

  
  const User={
     getData:function(){
        let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"))
        let data = JSON.parse(usersJson)
        return data
      },
      generateId:function(){
        let allUsers=this.findAll();
        let lastUser=allUsers.pop()
        if (lastUser){
        return lastUser.id+1
        }
        return 1
      },
      findAll: function(){
        return this.getData();
      },
      findById: function(id){
        let allUsers=this.findAll();
        let userFound=allUsers.find(oneUser => oneUser.id === id);
        return userFound;
      },
      findByField:function(field, text){
        let allUsers=this.findAll();
        let userFound=allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
      },
      create: function(userData){
        let allUsers = this.findAll()
        let newUser={
              

            id:this.generateId(),
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(path.join(__dirname, "../data/users.json"),JSON.stringify(allUsers, null, " "))
        return newUser
      },
    
    
  
}
//console.log(User.create({nombre:"sebas", email:"sebas@gmail.com"}))
module.exports = User;

