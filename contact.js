const validator = require('validator');
const fs = require('fs');
const readline = require('readline');

  // Membuat fungsion periksaFolder
  const periksaFolder = ()=> {
  //Membuat folder data apabila tidak ada
  const dirPath = './data';
  if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
  }

  }

  //Membuat fungsi periksaFile
  const periksaFile = ()=> {
  // Membuat file contacts.json jika belum ada
  const dataPath = './data/contacts.json';
  if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath,'[]','utf-8');
  }
  }

  //Membuat fungsi loader jsonnya
  const loadContact= ()=>{
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts =JSON.parse(file);
    return contacts;
  }


//Simpan Data
const saveIsiData = (name,mobile,email) => {
    periksaFolder();
    periksaFile();
    const contact = {name, mobile, email};
    const contacts = loadContact();
    // Membuat Jika Nama duplikat
const namaDuplikat = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if(namaDuplikat){
      //Menampilkan jika nilai true bila sama namanya maka munculkan nama sudah digunakan
      //agar error berhenti disini
      return  console.log("Nama sudah digunakan, silakan ganti nama lain");
  }
     //Menambahkan validasi untuk nomor telephone
     if(!validator.isMobilePhone(mobile, 'id-ID')){
      console.log("Nomor Telephone Yang anda Masukan Salah!!, Pastikan Format nomor sesuai.")
      return false;
    
    }
    //Menambahkan validasi untuk email
    if(!validator.isEmail(email)){
      console.log("Email yang anda Masukan Salah!, Pastikan Format email sesuai.")
      return false;
    }
    


    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log("Terima Kasih sudah memasukkan data!");

}

// Fungsi Menampilkan list data di json
const listContact= ()=>{
  const contacts = loadContact();
  console.log('Contact List : ');
  contacts.forEach((contact,i)=>{
    console.log(` ${i+1}. ${contact.name} - ${contact.mobile}`);

  });
};


module.exports = { saveIsiData, listContact};