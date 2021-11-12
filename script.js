// VARIABLES

let svg = d3.select("svg");
let zoneRouge = d3.select("#zoneRouge");
let joueurX = 50;
let joueurY = 90;
let vies = 3;
let score = 0;
let afficheVies = document.querySelector('.afficheVies')


svg.style("background-color", "black");


// récupérer le design du joueur
svg.append("use")
    .attr("id", "joueur")
    .attr("href", "#def_joueur")
// .attr("x","50")
// .attr("y","90");

//déplacement du joueur délimité dans la zone
function positionJoueur(e) {
    let pointer = d3.pointer(e);
    joueurX = pointer[0];
    joueurY = pointer[1];
    svg.select("#joueur")
        .attr("transform", `translate(${joueurX},${joueurY})`);
}

//déplacement au survol
zoneRouge.on("mousemove", function (e) {
    positionJoueur(e);
})



// ENNEMIS (q7-q8)
let positionEnnemis = [];

function entierAlea(n) {
    return Math.floor(Math.random() * n);
}

function vitesseAlea(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function creationSuppressionEnnemis() {
    svg.selectAll(".ennemi")
        .data(positionEnnemis)
        .enter()
        .append("use")
        .attr("class", "ennemi")
        .attr("href", "#def_ennemi")
        .exit()
        .remove();
    placeEnnemis();
}

function placeEnnemis() {
    svg.selectAll(".ennemi")
        .attr("transform", d => `translate(${d.x},${d.y})`);
}

function mouvementEnnemis() {
    positionEnnemis.forEach(d => {
        //chaque ennemi se déplace de sa vitesse en y
        d.y += d.vy;
    })

    //tous les points dans positionEnnemis ont limiteZone(d) = true
    if (positionEnnemis.every(limiteZone)) {
        placeEnnemis();
    } else {
        //au moins un ennemi est est arrivé au bord, on le retire du tableau
        positionEnnemis = positionEnnemis.filter(limiteZone);
        creationSuppressionEnnemis();
        compteVies();
       
    }
    //les coordonnées ont été modifiées, on fait la mise à jour
    placeEnnemis();
}

function limiteZone(d) {
    return d.y < 83;
}

creationSuppressionEnnemis();
setInterval(mouvementEnnemis, 100);

//toutes les 1000ms: un nouvel ennemi est ajouté
function nouvelEnnemi() {
    positionEnnemis.push({
        x: entierAlea(100),
        y: 0,
        vy: vitesseAlea(1, 3)
    });
    creationSuppressionEnnemis();
}
setInterval(nouvelEnnemi, 1000);

// Si un ennemi touche le bord opposé, le joueur perd une vie (q9)
function compteVies() {
    vies--;
    console.log(vies);
    d3.select(".afficheVies")
        .html(vies);
}




// TIRS

// // le joueur tire à intervalles réguliers (q10)

// TIRS JOUEUR
let coordonneesTir = [];

function nouveauTir() {
    // console.log(joueurX, joueurY);
    coordonneesTir.push({
        x: joueurX,
        y: joueurY,
        vy: -1
    });
    tirsJoueur();
    // console.log(coordonneesTir);
}

function tirsJoueur() {
    svg
        .selectAll(".balle")
        .data(coordonneesTir)
        .enter()
        .append("use")
        .attr("class", "balle")
        .attr("href", "#def_balle")
        .exit()
        .remove();
    placeTirs();
}

function placeTirs() {
    svg.selectAll(".balle")
        .attr("transform", d => `translate(${d.x},${d.y})`);
}

function mouvementTirs() {
    coordonneesTir.forEach(d => {
        //chaque tir se déplace en y
        d.y = d.y - 1;
    })
    tirsJoueur();
    // console.log("X= "+joueurX);
    // console.log("Y= "+joueurY);
}
setInterval(nouveauTir, 500);
setInterval(mouvementTirs, 50);



// TIRS ENNEMIS

let coordonneesTirEnn = [];

function nouveauTirEnn() {
    positionEnnemis.forEach(position => {
        coordonneesTirEnn.push({
            x: position.x + 4,
            y: position.y + 10,
            vy: position.vy
        });
    })
    tirsEnnemis();
}

function tirsEnnemis() {
    svg
        .selectAll(".balleEnn")
        .data(coordonneesTirEnn)
        .enter()
        .append("use")
        .attr("class", "balleEnn")
        .attr("href", "#def_balle_enn")
        .exit()
        .remove();
    placeTirsEnn();
}

function placeTirsEnn() {
    svg.selectAll(".balleEnn")
        .attr("transform", d => `translate(${d.x},${d.y})`);
}

function mouvementTirsEnn() {
    coordonneesTirEnn.forEach(d => {
        //chaque tir se déplace de sa vitesse en y
        d.y += d.vy;
    })
    //tous les points dans positionEnnemis ont limiteZone(d) = true
    if (coordonneesTirEnn.every(limiteZone)) {
        placeEnnemis();
    } else {
        //au moins un ennemi est est arrivé au bord, on le retire du tableau
        coordonneesTirEnn = coordonneesTirEnn.filter(limiteZone);
        tirsEnnemis();
    }
    tirsEnnemis();
}

let pause = false;
setInterval(function () {
    if (pause != true) {
        nouveauTirEnn()
    }
}, 2000);
setInterval(function () {
    if (pause != true) {
        mouvementTirsEnn()
    }
}, 50);



// PAUSE (brouillon)


// function fairePause() {
//     clearInterval(mouvementEnnemis);
//     clearInterval(nouvelEnnemi);
//     clearInterval(mouvementTirs);
//     clearInterval(nouveauTir);
//     clearInterval(mouvementTirsEnn);
//     clearInterval(nouveauTirEnn);
// }


document.addEventListener("keyup", function(event){
if(event.keyCode == 32){
    if(pause==true){
        pause=false;
    }else{
        pause=true;
    }
}
})
// d3.select('body').on('keypress', function (e) {

    
//     if (e.key == ' ' && pause == false) {
//         fairePause();
//         pause = true;
//     } else if (e.key == ' ' && pause == true) {
//         // On remet le jeu en marche en remettant tous les setInterval
//         mouvementEnnemis = setInterval(mouvementEnnemis, 100);
//         nouvelEnnemi = setInterval(nouvelEnnemi, 1000);
//         nouveauTir = setInterval(nouveauTir, 500);
//         mouvementTirs = setInterval(mouvementTirs, 50);
//         nouveauTirEnn = setInterval(nouveauTirEnn, 2000);
//         mouvementTirsEnn = setInterval(mouvementTirsEnn, 50);

//     }
// })
// pour le comptage des vies 




// FIN (brouillon)
function fin(){
    if(vies==0){
        d3.select(".messageFin").style("display","block");
    }
}
fin();