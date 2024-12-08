function calcolaCodiceFiscale() {
    if (verificaCampi()) {
        var CF = "";

        CF += estrapolaConsonantiCognome();
        CF += estrapolaConsonantiNome();
        CF += annoNascita();
        CF += codiceMese();
        CF += giornoNascita();
        CF += codicePaese();
        CF += calcolaCodiceControllo(CF);

        if (CF.length === 16) {
            CF = CF.toUpperCase();
            document.getElementById("risultato").innerHTML = `
                <hr>
                <h3>- Il tuo codice fiscale è: <b>${CF}</b></h3>
            `;
        }
    }
}

function verificaCampi() {
    if (document.form1.nome.value === "" || document.form1.cognome.value === "" || document.form1.luogoNascita.value === "") {
        alert("Tutti i campi sono obbligatori!");
        return false;
    }

    var dataNascita = document.form1.dataNascita.value;
    if (!dataNascita) {
        alert("La data di nascita è obbligatoria!");
        return false;
    }

    return true;
}

function isVocal(lettera) {
    lettera = lettera.toLowerCase();
    return "aeiou".includes(lettera);
}

function estrapolaConsonantiCognome() {
    var cognome = document.form1.cognome.value;
    var cf = "";
    var vocali = "";
    var consonanti = "";

    for(var i=0; i<cognome.length; i++){
        if(!isVocal(cognome.charAt(i))){
            consonanti += cognome.charAt(i);
        }else{
            vocali += cognome.charAt(i);
        }
    }

    cf = consonanti + vocali;

    if(cf.length === 1){
        cf += "XX";
    }else if(cf.length === 2){
        cf += "X";
    }

    return cf.substring(0, 3);    
}

function estrapolaConsonantiNome() {
    var nome = document.form1.nome.value;
    var cf = "";
    var vocali = "";
    var consonanti = "";

    for(var i=0; i<nome.length; i++){
        if(!isVocal(nome.charAt(i))){
            consonanti += nome.charAt(i);
        }else{
            vocali += nome.charAt(i);
        }
    }

    cf = consonanti + vocali;

    if(cf.length === 1){
        cf += "XX";
    }else if(cf.length === 2){
        cf += "X";
    }

    if(consonanti.length > 3){
        cf = consonanti.charAt(0) + consonanti.charAt(2) + consonanti.charAt(3);
    }

    return cf.substring(0, 3);    
}

function annoNascita() {
    var data = document.form1.dataNascita.value;
    var anno = data.substring(2, 4);
    return anno;
}

function codiceMese() {
    var data = document.form1.dataNascita.value;
    var mese = data.substring(5, 7); 
    var meseCodifica = {
        "01": "A", "02": "B", "03": "C", "04": "D", "05": "E",
        "06": "H", "07": "L", "08": "M", "09": "P", "10": "R",
        "11": "S", "12": "T"
    };

    return meseCodifica[mese];
}

function giornoNascita() {
    var data = document.form1.dataNascita.value;
    var giorno = data.substring(8, 10);
    var cf = "";

    if (document.form1.sesso.value == "M") {
        cf = giorno;
    } else if (document.form1.sesso.value == "F") {
        cf = (parseInt(giorno) + 40).toString().padStart(2, "0");
    }

    return cf;
}

function codicePaese() {
    var paese = document.form1.luogoNascita.value;
    return paese;
}


function calcolaCodiceControllo(codiceFiscaleParziale) {
    var valoriPari = {
        0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
        A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
        K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19,
        U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
    };

    var valoriDispari = {
        0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
        A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
        K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
        U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
    };

    var restoToChar = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    var somma = 0;

    for (var i = 0; i < codiceFiscaleParziale.length; i++) {
        var carattere = codiceFiscaleParziale[i].toUpperCase();

        if (i % 2 === 0) {
            somma += valoriDispari[carattere];
        } else {
            somma += valoriPari[carattere];
        }
    }

    var resto = somma % 26;
    return restoToChar[resto];
}