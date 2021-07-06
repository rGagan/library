const container = document.querySelector(".container")
const form = document.querySelector(".bookForm")
const formAdd = document.querySelector(".add");
const background = document.querySelector(".popupBack");

form.style.display="none";
background.style.display="none";

String.prototype.capitalize = function () 
{
    return this.toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
};

// Popup the form when button is pressed
formAdd.addEventListener('click', ()=>{
    form.style.display="block";
    background.style.display="block";
})

// taking the information input from the user
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const hName = document.getElementById("name")
    const hAuthor = document.getElementById("author")
    const hPages = document.getElementById("pages")
    const hRead = document.getElementById("unread")

    const name=hName.value.capitalize();
    const author=hAuthor.value.capitalize();
    const pages=hPages.value;

    let read;
    if(!hRead.checked)
        read=true;
    else
        read=false;
    

    hName.value='';
    hAuthor.value='';
    hPages.value='';
    hRead.checked=true;

    addBookToLib(name, author, pages, read);
    form.style.display="none";
    background.style.display="none";
})

// Closing form when 'x' is pressed
form.addEventListener('click', (e)=>{
    if(e.target.className==="closeForm"){
        e.preventDefault();
        form.style.display="none";
        background.style.display="none";
    }
})

let myLib = [];
// Constructor for book item
function Book(title, author, pages, read) 
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read=read;
}

// removing all the books and displaying them each time a new book is added
function display ()
{
    while(container.firstChild)
    {
        container.removeChild(container.firstChild);
    }

    myLib.forEach(element => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('bookItem');

        const dlt = document.createElement('button');
        dlt.classList.add('delete');
        dlt.innerHTML="X";

        const title = document.createElement('h3');
        title.classList.add('title');
        title.innerHTML=element.title;

        const author = document.createElement('span');
        author.classList.add('author');
        author.innerHTML="By: "+element.author;

        const pages = document.createElement('span');
        pages.classList.add('pages');
        pages.innerHTML="Pages: "+element.pages;

        const read = document.createElement('span');
        read.classList.add('read');
        read.innerHTML="Read Status: "+ (element.read?"Read":"Unread");

        //toggle button for read
        const toggleLbl = document.createElement('label');
        toggleLbl.classList.add('switch');
        const toggleInp = document.createElement('input');
        toggleInp.type="checkbox";
        toggleInp.id="togBtn";
        const toggleDiv = document.createElement('div');
        toggleDiv.classList.add('slider');
        toggleDiv.classList.add('round');
        if(element.read)
            toggleInp.classList.add('checked');
        toggleLbl.appendChild(toggleInp);
        toggleLbl.appendChild(toggleDiv);

        bookItem.appendChild(dlt);
        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(pages);
        bookItem.appendChild(read);
        bookItem.appendChild(toggleLbl);

        container.appendChild(bookItem);
    }); 
}

Book.prototype.info = function() 
{
    let msg = this.title+" by "+ this.author + ", "+ this.pages+" pages, "+ (this.read?"has been read.": "not read yet");
    return msg;
}

// Initializer of Book object
function addBookToLib(bk, auth, pg, read)
{
   let book = new Book(bk, auth, pg, read);
   myLib.push(book);
   display();
}

const findBook = (title) => {
    console.log(title);
    for(book of myLib)
    {
        if(book.title===title)
            return myLib.indexOf(book);
    }
}

container.addEventListener('click', (e)=>{
    
    
    if(e.target.className==="delete")
    {
        console.log(e.target.className)
        const ind=findBook(e.target.parentNode.childNodes[1].innerText);
        console.log(ind);
        myLib.splice(ind, 1);
        display();
    }
    else if(e.target.id==="togBtn")
    {
        console.log(e.target.parentNode.parentNode.childNodes[1])
        const ind=findBook(e.target.parentNode.parentNode.childNodes[1].innerText);

        console.log(ind);
        myLib[ind].read=!myLib[ind].read;
        console.log(myLib[ind].read)
        display();
    }
})



