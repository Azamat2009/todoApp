const baseURL = "http://localhost:3000/users";
let form = document.forms.login;
let ageInp = document.querySelector("#age");
let nameInp = document.querySelector("#name");
let table = document.querySelector("table");
let btn = document.querySelector(".add");
let tbody = document.querySelector("table tbody");

function reload(arr) {
  for (let item of arr) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdYear = document.createElement("td");
	let editImg = document.createElement('img')
	let delImg = document.createElement('img')

	editImg.classList.add('edit')
	delImg.classList.add('del')

	editImg.src = "./assets/edit (1).svg"
    editImg.classList.add('edit')
    delImg.src = "./assets/trash-2.svg"

    editImg.addEventListener('click', () => {

    })

delImg.addEventListener('click', () => {
  tr.remove();
  fetch(`${baseURL}/${item.id}`, { method: 'DELETE' })
    .then(() => console.log(`User with id ${item.id} deleted successfully.`))
    .catch((err) => console.log(err));
  arr = arr.filter((user) => user.id !== item.id);
})


    tdId.classList.add("fff");
    tdName.classList.add("ff");
    tdYear.classList.add("f");

    tdId.textContent = item.id;
    tdName.textContent = item.name;
    tdYear.textContent = item.year;

    tr.append(tdId , tdName , tdYear , editImg , delImg);
    table.append(tr);
  }
}



fetch(baseURL)
  .then((res) => res.json())
  .then((res) => reload(res))
  .catch((err) => console.log(err));

  btn.addEventListener("click", (e) => {
	e.preventDefault();
  
	let formData = new FormData(form);
	let name = formData.get("name");
	let age = formData.get("age");
  
	fetch(baseURL, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({ name: nameInp.value, year: ageInp.value }),
	})
	  .then((res) => res.json())
	  .then((res) => {
		let tr = document.createElement("tr");
		let tdId = document.createElement("td");
		let tdName = document.createElement("td");
		let tdYear = document.createElement("td");
  
		tdId.classList.add("fff");
		tdName.classList.add("ff");
		tdYear.classList.add("f");
  
		tdId.textContent = res.id;
		tdName.textContent = res.name;
		tdYear.textContent = res.year;
  
		tr.appendChild(tdId);
		tr.appendChild(tdName);
		tr.appendChild(tdYear);
  
		table.appendChild(tr);
  
		form.reset();
	  })
	  .catch((err) => console.log(err));
  });
  