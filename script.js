// VARIABLES GENERALES -------------------------------------
let svg = d3.select("svg");
let zoneRouge = d3.select("#zoneRouge");
let joueurX = 50;
let joueurY = 90;
let joueur = [
    joueurX,
    joueurY
];
let vies = 3;
let score = 0;

svg.style("background-color", "black");


// JOUEUR --------------------------------------------------

// récupérer le design du joueur
svg.append("use")
    .attr("id", "joueur")
    .attr("href", "#def_joueur")
// .attr("x","50")
// .attr("y","90")
.attr("transform", "translate(45,90)");
// .attr("z-index","100");

//déplacement du joueur délimité dans la zone
function positionJoueur(e) {

    // .attr("transform", "translate(50,90)");
    let pointer = d3.pointer(e);
    joueurX = pointer[0];
    joueurY = pointer[1];
    joueur.push({
        x: joueurX,
        y: joueurY
    });
    // console.log(joueur);
    svg.select("#joueur")
        .attr(`transform`, `translate(${joueurX},${joueurY})`);
}

zoneRouge.on("mousemove", function (e) {
    if (pause != true) {
        positionJoueur(e);
    }
})


// ENNEMIS -------------------------------------------------
let positionEnnemis = [];

function entierAlea(n) {
    return Math.floor(Math.random() * n);
}

// function vitesseAlea(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function creationSuppressionEnnemis() {

    let link =
    svg.selectAll(".ennemi")
        .data(positionEnnemis);
        link.enter()
        .append("use")
        .attr("class", "ennemi")
        .attr("href", "#def_ennemi")
        link.exit()
        .remove();
    placeEnnemis();

}

function creationSuppressionEnnemis2() {

    let link =
    svg.selectAll(".ennemi")
        .data(positionEnnemis);
        link.enter()
        .append("use")
        .attr("class", "ennemi")
        .attr("href", "#def_ennemi2")
        link.exit()
        .remove();
    placeEnnemis();

}

function creationSuppressionEnnemis3() {

    let link =
    svg.selectAll(".ennemi")
        .data(positionEnnemis);
        link.enter()
        .append("use")
        .attr("class", "ennemi")
        .attr("href", "#def_ennemi3")
        link.exit()
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

    // si tous les points dans positionEnnemis ont limiteZone(d) = true : autrement dit, si aucun ennemi n'est arrivé au bord
    if (positionEnnemis.every(limiteZone)) {
        placeEnnemis();
    } else {
        // au moins un ennemi est est arrivé au bord, on le retire du tableau
        positionEnnemis = positionEnnemis.filter(limiteZone);
        creationSuppressionEnnemis();
        creationSuppressionEnnemis2();
        creationSuppressionEnnemis3();
        retireVie();
        if (vies == 0) {
            fin();
        }
    }
    //les coordonnées ont été modifiées, on fait la mise à jour
    placeEnnemis();
}

function limiteZone(d) {
    return d.y < 85;
}

creationSuppressionEnnemis();

setInterval(function () {
    if (pause != true) {
        mouvementEnnemis()
    }
}, 100);

//toutes les 1500ms: un nouvel ennemi est ajouté
function nouvelEnnemi() {
console.log("score : "+score);
    if (score<100){
        positionEnnemis.push({
            x: entierAlea(100),
            y: 0,
            vy: 1
        });
        creationSuppressionEnnemis();
    }
    if (score>=100 && score<200){
        positionEnnemis.push({
            x: entierAlea(100),
            y: 0,
            vy: 2
        });
        creationSuppressionEnnemis2();
    }
    if (score>=200){
        positionEnnemis.push({
            x: entierAlea(100),
            y: 0,
            vy: 3
        });
        creationSuppressionEnnemis3();
    }
}
setInterval(function () {
    if (pause != true) {
        nouvelEnnemi()
    }
}, 1500);



// TIRS -------------------------------------------------------


// FONCTIONS POUR LES COLLISIONS --------------------------
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);

}

function suppressionDansTableau(tableau, critere) {
    let suppression = false;
    for (let i = tableau.length - 1; i >= 0; i--) {
        if (critere(tableau[i])) {
            tableau.splice(i, 1);
            suppression = true;
        }
    }
    return suppression;
}


// TIRS JOUEUR ----------------------------------------------
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
    let link = svg.selectAll(".balle").data(coordonneesTir);
        link.enter()
        .append("use")
        .attr("class", "balle")
        .attr("href", "#def_balle")
        link.exit()
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


    //fonction spécifique pour retirer les ennemis qui ont été touchés par un tir joueur
    if (suppressionDansTableau(coordonneesTir, d =>
            suppressionDansTableau(positionEnnemis, position => distance(d, position) < 7))) {
        // test de collision entre chaque ennemi et chaque tir joueur 
        //au moins un ennemi et un tir joueur ont été supprimés
        tirsJoueur();
        creationSuppressionEnnemis();
        creationSuppressionEnnemis2();
        creationSuppressionEnnemis3();
        augmenteScore();
    } else {
        //uniquement les coordonnées des tirs joueur ont été modifiées, on fait la mise à jour correspondante
        placeTirs();

    }

    //fonction spécifique pour retirer les tirs ennemis qui ont été touchés par un tir joueur
    if (suppressionDansTableau(coordonneesTir, d =>
            suppressionDansTableau(coordonneesTirEnn, position => distance(d, position) < 4))) {
        // test de collision entre chaque ennemi et chaque tir joueur 
        //au moins un ennemi et un tir joueur ont été supprimés
        tirsJoueur();
        tirsEnnemis();
        augmenteScore();
    } else {
        //uniquement les coordonnées des tirs joueur ont été modifiées, on fait la mise à jour correspondante
        placeTirs();

    }
}

setInterval(function () {
    if (pause != true) {
        nouveauTir()
    }
}, 500);
setInterval(function () {
    if (pause != true) {
        mouvementTirs()
    }
}, 25);


// TIRS ENNEMIS --------------------------------------------

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
    let link = svg.selectAll(".balleEnn").data(coordonneesTirEnn);
        link.enter()
        .append("use")
        .attr("class", "balleEnn")
        .attr("href", "#def_balle_enn")
        link.exit()
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
        d.y += 3;
    })
    // POUR QUE LES TIRS ENNEMIS DISPARAISSENT LORSQU'ILS TOUCHENT LE BORD
    //tous les points dans positionEnnemis ont limiteZone(d) = true
    if (coordonneesTirEnn.every(limiteZone)) {
        placeEnnemis();
    } else {
        //au moins un ennemi est est arrivé au bord, on le retire du tableau
        coordonneesTirEnn = coordonneesTirEnn.filter(limiteZone);
        tirsEnnemis();
        retireVie();
        if (vies == 0) {
            fin();
        }
    }


    //fonction spécifique pour retirer les tirs ennemis qui ont touché le joueur
    if (suppressionDansTableau(coordonneesTirEnn, d =>(distance(d, {x: joueurX, y: joueurY}) < 10))) {
        // test de collision entre chaque tir ennemi et le joueur
        //au moins un tir ennemi a été supprimé
        tirsEnnemis();
        retireVie();
        if (vies == 0) {
            fin();
        }
    } else {
        //uniquement les coordonnées des tirs ennemis ont été modifiées, on fait la mise à jour correspondante
        placeTirs();

    }

    tirsEnnemis();
}


setInterval(function () {
    if (pause != true) {
        nouveauTirEnn()
    }
}, 2500);
setInterval(function () {
    if (pause != true) {
        mouvementTirsEnn()
    }
}, 50);


// pop-up quand on perd 


// function fin(){
//     if(vies==0){
//         d3.select(".mess")
//         .remove(".nope")
//         .attr(".messageFin")
//         console.log("sa marche")
//     }

// }



// PAUSE (brouillon)


// function fairePause() {
//     clearInterval(mouvementEnnemis);
//     clearInterval(nouvelEnnemi);
//     clearInterval(mouvementTirs);
//     clearInterval(nouveauTir);
//     clearInterval(mouvementTirsEnn);
//     clearInterval(nouveauTirEnn);
// }


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
// fin()




// GESTION DU JEU (vies, score, fin, pause, recommencer la partie) ------------------
function retireVie() {
    vies--;
    d3.select(".afficheVies")
        .html(vies); 
}

function augmenteScore() {
    score = score + 10;
    d3.select(".afficheScore")
        .html(score);
}

// PAUSE
let pause = false;
document.addEventListener("keyup", function (event) {
    if (vies > 0) {
        if (event.keyCode == 32) {
            if (pause == true) {
                pause = false;
                d3.select(".messagePause")
                    .style("display", "none");
            } else {
                pause = true;
                d3.select(".messagePause")
                    .style("display", "block");
            }
        }
    }
})

// FIN
function fin() {
    console.log("perdu");
    d3.select(".messageFin")
        .style("display", "block");
    d3.select(".afficheScoreFin")
        .html(score);
    pause = true;
}