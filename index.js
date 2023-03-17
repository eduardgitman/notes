window.onload = function() {
    document.getElementById("year").innerHTML = new Date().getFullYear();
    var home = document.getElementById('container').innerHTML;
    var controls = document.getElementById('controls').innerHTML;

    displaySavedNote();

    document.getElementById('home').onclick = function() {
        document.getElementById('container').innerHTML = home;
        document.getElementById('controls').innerHTML = controls;
        document.getElementById('menu').className = 'hiddenmenu';
        displaySavedNote();
    }

    document.getElementById('notes').onclick = function() {
        navigateAwayFromHome();
        
        var container = document.getElementById('container');
        let allNotes = JSON.parse(localStorage.getItem("notes"));
        if(allNotes == null ) {
            return;
        }

        for(let n of allNotes) {
            var text = document.createTextNode(n.title);
            var p = document.createElement('p');            
            p.appendChild(text);
            p.setAttribute('style', 'text-decoration : underline')
            p.setAttribute('data-id', n.id);
            p.addEventListener("click", function(e) {
                // load the home screen
                document.getElementById('home').click();
                let id = this.getAttribute("data-id");
                displaySavedNote(id)
            }, false);
            container.appendChild(p);
        }
    }

    document.getElementById('about').onclick = function() {
        navigateAwayFromHome();
        var container = document.getElementById('container');
        var p = document.createElement('p');
        p.id = 'aboutus';
        container.appendChild(p);
        var text = document.createTextNode("What a time to make a note...");
        p.appendChild(text);
    }

    
    document.getElementById('menulink').onclick = function() {
        var menu = document.getElementById('menu');
        if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
        }
        else {
            menu.className = 'hiddenmenu';
        }
    }
}

function navigateAwayFromHome() {
    document.getElementById('container').innerHTML = "";
    document.getElementById('controls').innerHTML = "";        
    document.getElementById('menu').className = 'hiddenmenu';
}

var notes = [];

function checkWebStorageSupport() {
    if(typeof(Storage) !== "undefined") {
        return(true);
    }
    else {
        alert("Web storage unsupported!");
        return(false);
    }
}

function displaySavedNote(noteId) {
    if(checkWebStorageSupport() == true) {
        let allNotes = JSON.parse(localStorage.getItem("notes"));
        if(allNotes == null ) {
            return;
        }
        if(noteId == undefined) {
            let mostRecent = allNotes[allNotes.length - 1];
            pushNoteToHtml(mostRecent)
        } else {
            for(let note of allNotes) {
                if (note.id == noteId) {
                    pushNoteToHtml(note)
                }
            }
        }        
    }
}

function pushNoteToHtml(note) {
    document.getElementById('noteId').value = note.id;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('area').value = note.area;
}

function save() {
    if(checkWebStorageSupport() == true) {
        let title = document.getElementById("noteTitle").value;
        let area = document.getElementById("area").value;
        let randomId = (Math.random() + 1).toString(36).substring(7);
        let note = {title: title, area: area, id:randomId};

        if(title != '') {
            var storedNotes = JSON.parse(localStorage.getItem("notes"));

            if(storedNotes == undefined || storedNotes == null) {
                storedNotes = [];             
            }

            storedNotes.push(note);

            localStorage.setItem("notes", JSON.stringify(storedNotes));

            clear();
            document.getElementById('notes').click()
        } else {
            alert("Nothing to save");
        }
    }
}

function remove() {
    let noteId = document.getElementById('noteId').value;
    var storedNotes = JSON.parse(localStorage.getItem("notes"));

    var filtered = storedNotes.filter(function(value, index, arr){ 
        return value.id != noteId;
    });

    localStorage.setItem("notes", JSON.stringify(filtered));

    clear();
    document.getElementById('notes').click()
}

function clear() {
    document.getElementById('noteId').value = "";    
    document.getElementById('noteTitle').value = "";
    document.getElementById('area').value = "";
}