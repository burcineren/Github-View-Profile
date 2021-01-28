class Storage{
    static getSearchedUsersFromStorage(){
        // tüm kullanıcıları al

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];

        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static  addSearchedUserToStorage(username){
        //kullanıcı ekle


        let users = this.getSearchedUsersFromStorage();

        //IndexOf

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));

    }
    static clearAllSearchedUsersFromStorage(){
        //Tüm KUllanıcıları sil

        localStorage.removeItem("searched");
    }
}