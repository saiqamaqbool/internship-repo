 const fetchBtn = document.getElementById("fetchBtn");
    const loader = document.getElementById("loader");
    const table = document.getElementById("dataTable");
    const tbody = table.querySelector("tbody");

    fetchBtn.addEventListener("click", async () => {
     
      loader.classList.remove("d-none");
      table.classList.add("d-none");
      //http://localhost:3000/users
      
        
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

       
        data.users.forEach((user) => {
          let row = `<tr>
                      <td>${user.id}</td>
                      <td>${user.firstName}</td>
                      <td>${user.email}</td>
                    </tr>`;
          tbody.innerHTML += row;
        });
        // let row= "<tr>" +
          //   "<td>"  + user.id +"</td>" +
          //    "<td>"  + user.name +"</td>" +
          //     "<td>"  + user.email +"</td>" +
          //   "</tr>";

        
        loader.classList.add("d-none");
        table.classList.remove("d-none");

      
    });