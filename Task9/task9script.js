const fetchBtn = document.getElementById("fetchBtnid");
const table = document.getElementById("dataTable");

const addRecordBtn = document.getElementById("addRecordBtn");
const tbody = table.querySelector("tbody");


fetchBtn.addEventListener("click", loadUsers);
//data into table
async function loadUsers() {
  table.classList.add("d-none");
  try {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    tbody.innerHTML = ""; 

    data.forEach((user) => {
      let row = `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.Email}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
              </tr>`;
      tbody.innerHTML += row;
    });

    table.classList.remove("d-none");
  
    addRecordBtn.classList.remove('d-none');
    
  } catch (error) {
    
    alert("Failed to load users.");
  }
}
addRecordBtn.addEventListener('click', () => {
  addForm.classList.toggle('d-none');
});





//add user
async function Addproduct() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const id = parseInt(document.getElementById("idd").value.trim());

  if (!name || !email || !id) {
    alert("Please fill all fields.");
    return;
  }

  try {
const check = await fetch('http://localhost:3000/users');
const users = await check.json();

let exists = false;

for (let i = 0; i < users.length; i++) {
  if (users[i].id === id) {
    exists = true;
    break; 
  }
}

if (exists) {
  alert("This ID already exists! Please choose another.");
  return;
}
    const newUser = {
      id: id,
      name: name,
      Email: email
    };

    const addRes = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
				'Accept': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    
if (addRes.status === 200 || addRes.status === 201) {
  alert("User added successfully!");
} else {
  alert("Failed to add user.");
  return; 
}
    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("idd").value = "";

    loadUsers(); 

  } catch (error) {
    
    alert("Failed to add user.");
  }
}
const addForm = document.getElementById("addForm");

addForm.addEventListener("submit", function(event) {
  event.preventDefault(); 
});

// Delete 
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch("http://localhost:3000/users/" +id, {
      method: 'DELETE'
    });

    if (res.status === 200 || res.status === 201) {
      alert("User deleted successfully!");
      loadUsers(); 
    } else { 
      alert("Failed to delete user. User may not exist.");
    }

  } catch (error) {
    alert("Failed to delete user. Network or server error.");
  }
}



