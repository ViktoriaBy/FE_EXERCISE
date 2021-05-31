// Back end link
let link = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
// Calling a function to fetch the list and display it
get_itemsList(link).then(items_list => {
    // Sort Items List
    items_list = sort_Items(items_list);
    // Display Items List
    display_itemsList(items_list);
});
// Async function to fetch the list from API
async function get_itemsList(link){

    let response = await fetch(link);

    if (response.ok) {
        let return_value = await response.json();
        return return_value
    } else {
        alert("HTTP-Error: " + response.status);
    }
}
// Function to display items 
function display_itemsList(items_list){
    let current_group = null;

    items_list.forEach((item) => {
        
        if(current_group === null){
            create_listHeader(item.listId);

            add_list_item(item.listId, item.name);

            current_group = item.listId;   

        }else if(current_group < item.listId){
            create_listHeader(item.listId);

            add_list_item(item.listId, item.name);

            current_group = item.listId; 

        }else{
            add_list_item(item.listId, item.name);
        }
    });
}
// Function that sorts the Items list by Name first and then by listId
function sort_Items(itemsList){
    itemsList.sort((a, b) => {
        if (a.name === b.name) {
            return 0;
        }
        else if (a.name === null) {
            return 1;
        }
        else if (b.name === null) {
            return -1;
        }
        else if (a.name === "") {
            return 1;
        }
        else if (b.name === "") {
            return -1;
        }
        else {
            return a.name < b.name ? -1 : 1;
        }
    });

    itemsList.sort((a,b) => {
        return a.listId - b.listId
    });

    return itemsList
}
// Function that creates elements for list Groups
function create_listHeader(listId){
    let listGroupDiv = document.createElement("div");
    let listGroupH1 = document.createElement("h1");
    let listGroupUl = document.createElement("ul");

    listGroupH1.innerHTML += `Items List ${listId}`;
    listGroupDiv.id = `listGroup-${listId}`;
    listGroupUl.className = "list-group";
    listGroupUl.id = `list-group-ul-${listId}`;

    listGroupDiv.appendChild(listGroupH1);
    listGroupDiv.appendChild(listGroupUl);

    document.getElementById("container").appendChild(listGroupDiv);
}
// Function that adds list items to a Group
function add_list_item(listId, name){
    if(name !== null && name !== ""){
        let list_group_ul = document.getElementById(`list-group-ul-${listId}`)
        let listGroupLi = document.createElement("li");
        listGroupLi.className = "list-group-item";
        listGroupLi.innerText += `${name}`;
        
        list_group_ul.appendChild(listGroupLi);
    }
}