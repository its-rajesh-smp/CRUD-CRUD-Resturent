//! Curd Key
let key = localStorage.getItem("key");

//! Set New Key
document.querySelector(".bx-user").addEventListener("click", () => {
  setKey();
});

//! GetData
window.addEventListener("DOMContentLoaded", () => {
  getData();
});
//! PostData
document.querySelector(".btnTake").addEventListener("click", (e) => {
  e.preventDefault();
  const item = document.querySelector(".inpOrderItem").value;
  const price = document.querySelector(".inpPrice").value;
  const table = document.querySelector(".inpOption").value;

  if (item == "" || price == "" || table == "Select Table") {
    return;
  }
  document.querySelector(".loader").style.display = "block";
  postData(item, price, table);
});
//! RemoveData
document.querySelector(".table_div").addEventListener("click", (e) => {
  if (e.target.classList.contains("orderDelete")) {
    document.querySelector(".loader").style.display = "block";
    deleteData(e.target.parentElement.parentElement);
  }
});

//todo Set Key
function setKey() {
  let inp = prompt("Add The Key");
  if (inp != "" && inp != null) {
    localStorage.setItem("key", inp + "/orders");
    window.location.reload();
  } else {
    alert("Missing Input Value!");
    return;
  }
}

// Get Data
async function getData() {
  try {
    await axios.get(key).then((res, rej) => {
      document.querySelector(".loader").style.display = "none";
      res.data.forEach((items) => {
        printData(items);
      });
    });
  } catch (error) {
    console.log("Something Went Wrong || Check The Endpoint");
    console.log(error.code);
    document.querySelector(".loader").style.display = "none";
    alert(
      "Error... \nClick On User Icon || Change The CURD url || ex: https://crudcrud.com/api/8c9d51e016ca40d1801a50e88262d485"
    );
  }
}

// PostData
async function postData(inp_item, inp_price, inp_tableNo) {
  try {
    await axios
      .post(key, {
        orderItem: inp_item,
        orderPrice: inp_price,
        tableNo: inp_tableNo,
      })
      .then((res, rej) => {
        console.log(res);
        printData(res.data);
        document.querySelector(".loader").style.display = "none";
      });
  } catch (error) {
    console.log(error.code);
    document.querySelector(".loader").style.display = "none";
  }
}

// DeleteData
async function deleteData(element) {
  const id = element.children[0].innerText;
  try {
    await axios.delete(`${key}/${id}`).then((res, rej) => {
      let valueToDeduct = parseInt(element.children[2].children[0].textContent);
      let valueToDeductFrom = element.parentElement.classList[0];
      let previousValue = parseInt(
        document.querySelector(`.${valueToDeductFrom}_amount`).textContent
      );

      document.querySelector(`.${valueToDeductFrom}_amount`).textContent =
        previousValue - valueToDeduct + " $";

      element.remove();
      document.querySelector(".loader").style.display = "none";
    });
  } catch (error) {
    console.log(error);
    document.querySelector(".loader").style.display = "none";
  }
}

// Printing Values
function printData(res) {
  let newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.innerHTML = `
    <div style="display: none;" class="div_id" >${res._id}</div>
    <div class="div_orderItem" ><p class="orderItem">${res.orderItem}</p></div>
    <div class="div_orderPrice" ><span class="orderPrice">${res.orderPrice}</span><span> $</span></div>
    <div class="div_orderDelete" ><button class="orderDelete">X</button></div>
    `;
  document.querySelector(`.${res.tableNo}`).append(newElement);

  let value = parseInt(
    document.querySelector(`.${res.tableNo}_amount`).innerText.replace(" $", "")
  );
  value = value + parseInt(res.orderPrice);

  document.querySelector(`.${res.tableNo}_amount`).textContent = value + " $";
}
