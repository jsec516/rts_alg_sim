function handleData() {
    var x = +document.getElementById("period").value;
    var y = +document.getElementById("exec").value;
    var z = +document.getElementById("deadline").value;

    try {
        if (document.getElementById("mySelect").value == "edf") {
            edfinsert(x, y, z);
        }
    } catch (e) {
        console.error(e.name + ': ' + e.message)
    }

    try {
        if (document.getElementById("mySelect").value == "rms") {
            rmsinsert(x, y, z);
        }
    } catch (e) {
        console.error(e.name + ': ' + e.message)
    }

    try {
        if (document.getElementById("mySelect").value == "lst") {
            lstinsert(x, y, z);
        }
    } catch (e) {
        console.error(e.name + ': ' + e.message)
    }
    document.getElementById("period").value == "";
    document.getElementById("exec").value == "";
    document.getElementById("deadline").value == "";

}
function run() {
    if (document.getElementById("mySelect").value == "edf") {
        edf();
    }
    if (document.getElementById("mySelect").value == "rms") {
        rms();
    }
    if (document.getElementById("mySelect").value == "lst") {
        lst();
    }
}
// append row to the HTML table
function appendColumn() {
    var tbl = document.getElementById('table'), // table reference
        i;
    // open loop for each row and append cell
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, 'col');
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}

function changeTable(color) {
    document.getElementById("column").bgColor = color;
}