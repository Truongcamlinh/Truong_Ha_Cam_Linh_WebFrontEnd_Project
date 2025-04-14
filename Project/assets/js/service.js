// ====== DOM ELEMENTS ======
const serviceTableBody = document.getElementById("serviceTableBody");
const btnAddService = document.getElementById("btnAddService");
const serviceModal = document.getElementById("serviceModal");
const serviceNameInput = document.getElementById("serviceName");
const serviceDescInput = document.getElementById("serviceDescription");
const serviceImgInput = document.getElementById("serviceImage");
const modalTitle = document.getElementById("modalTitle");
const saveServiceBtn = document.getElementById("saveServiceBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

let editServiceIndex = null;
let editIndex = null;

// ====== TOAST FUNCTION ======
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ====== CONFIRM FUNCTION ======
function showConfirm(message, onConfirm) {
  const modal = document.getElementById("confirmModal");
  const confirmText = document.getElementById("confirmText");
  const btnYes = document.getElementById("confirmYes");
  const btnNo = document.getElementById("confirmNo");

  confirmText.textContent = message;
  modal.style.display = "flex";

  function closeModal() {
    modal.style.display = "none";
    btnYes.removeEventListener("click", handleYes);
    btnNo.removeEventListener("click", closeModal);
  }

  function handleYes() {
    onConfirm();
    closeModal();
  }

  btnYes.addEventListener("click", handleYes);
  btnNo.addEventListener("click", closeModal);
}

// ====== SERVICE FUNCTIONS ======
function getServices() {
  return JSON.parse(localStorage.getItem("services")) || [];
}

function saveServices(services) {
  localStorage.setItem("services", JSON.stringify(services));
}

function renderServices() {
  const services = getServices();
  serviceTableBody.innerHTML = "";
  services.forEach((service, index) => {
    serviceTableBody.innerHTML += `
      <tr>
        <td>${service.name}</td>
        <td>${service.description}</td>
        <td><img src="${service.image}" alt="Dịch vụ" style="width: 80px; height: auto;" /></td>
        <td>
          <a href="#" onclick="editService(${index})">Sửa</a> |
          <a href="#" onclick="deleteService(${index})" style="color:red;">Xoá</a>
        </td>
      </tr>
    `;
  });
}

function openModal(isEdit = false) {
  serviceModal.style.display = "flex";
  modalTitle.textContent = isEdit ? "Sửa dịch vụ" : "Thêm dịch vụ mới";
}

function closeModal() {
  serviceModal.style.display = "none";
  serviceNameInput.value = "";
  serviceDescInput.value = "";
  serviceImgInput.value = "";
  editServiceIndex = null;
}

function saveService() {
  const name = serviceNameInput.value.trim();
  const description = serviceDescInput.value.trim();
  const image = serviceImgInput.value.trim();

  if (!name || !description || !image) {
    showToast("Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }

  const services = getServices();
  const newService = { name, description, image };

  if (editServiceIndex !== null) {
    services[editServiceIndex] = newService;
    showToast("Cập nhật dịch vụ thành công!");
  } else {
    services.push(newService);
    showToast("Thêm dịch vụ thành công!");
  }

  saveServices(services);
  renderServices();
  closeModal();
}

function editService(index) {
  const services = getServices();
  const service = services[index];
  serviceNameInput.value = service.name;
  serviceDescInput.value = service.description;
  serviceImgInput.value = service.image;
  editServiceIndex = index;
  openModal(true);
}

function deleteService(index) {
    showConfirm("Bạn có chắc muốn xoá dịch vụ này?", () => {
      const services = getServices();
      services.splice(index, 1);
      saveServices(services);
      renderServices();
      showToast("Xoá dịch vụ thành công!");
    });
  }
  
btnAddService.addEventListener("click", () => openModal(false));
saveServiceBtn.addEventListener("click", saveService);
closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", renderServices);
