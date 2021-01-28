//elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();

const ui = new UI();

eventListeners();


function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}
function getData(e){

    let username = nameInput.value.trim();

    if (username === ""){
        alert("Lütfen Geçerli bir kullanıcı adı girin.")
    }
    else{
        
        github.getGithubData(username)
        .then(response => {

            if(response.user.message === "Not Found"){
                ui.showError("kullanıcı bulunamadı");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
            
        })
        .catch(err => ui.showError(err));

    }
    ui.clearInput();//input temizleme
    e.preventDefault();
}
function clearAllSearched(){
    //Tüm arananları temizle


    if(confirm("Emin Misin ?")){

        //silme işlemler
        Storage.clearAllSearchedUsersFromStorage();//storageden temizleme

        uii.clearAllSearchedFromUI();
    }


}
function getAllSearched(){
    //Tüm arannaları storageden al ve ui ye ekle
    let users = Storage.getSearchedUsersFromStorage();
    
    let result = "";

    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>

        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;

}