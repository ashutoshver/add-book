let contacts = [];

document.getElementById("addcont").addEventListener("click", addContact)

function addContact() {
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  
  if (!name || !mobile) {
    alert('Please provide both name and mobile number');
    return;
  }
  
  for (let contact of contacts) {
    if (contact.mobile === mobile) {
      alert('Mobile number already exists!');
      return;
    }
  }
  
  contacts.push({ name, mobile });
  nameInput.value = '';
  mobileInput.value = '';
  renderContacts();
}

function renderContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';
  if (contacts.length === 0) {
    contactList.textContent = 'No contacts found!';
    return;
  }
  
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
  for (let contact of sortedContacts) {
    const listItem = document.createElement('li');
    listItem.textContent = `${contact.name} - ${contact.mobile}`;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editContact(contact);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("btne");
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteContact(contact);
    const div = document.createElement('div');
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    listItem.appendChild(div);

    contactList.appendChild(listItem);
  }
}

function filterContacts() {
  const filterName = document.getElementById('filterName').value.trim().toLowerCase();
  const filterMobile = document.getElementById('filterMobile').value.trim();
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filterName) && contact.mobile.includes(filterMobile));
  contacts = filteredContacts;
  renderContacts();
}

function editContact(contact) {
  const newName = prompt('Enter new name:', contact.name);
  const newMobile = prompt('Enter new mobile number:', contact.mobile);
  
  if (!newName || !newMobile) {
    alert('Please provide both name and mobile number');
    return;
  }
  
  for (let existingContact of contacts) {
    if (existingContact.mobile === newMobile && existingContact.mobile !== contact.mobile) {
      alert('Mobile number already exists!');
      return;
    }
  }
  
  contact.name = newName;
  contact.mobile = newMobile;
  renderContacts();
}

function deleteContact(contact) {
  const confirmation = confirm(`Are you sure you want to delete ${contact.name}?`);
  if (confirmation) {
    contacts = contacts.filter(c => c !== contact);
    renderContacts();
  }
}

renderContacts();