let svg = d3.select("svg");
<<<<<<< Updated upstream


=======
let viesRestantes = 3;
>>>>>>> Stashed changes
svg.style("background-color", "black");

// Panneau d'indication en haut
d3.select("section")
    .append("p")
    .text(`Nombre de vies restantes : ${viesRestantes}`);

d3.select("section")
    .append("p")
    .text("Score : ");


// Zone du joueur (rouge)
d3.select("svg")
    .append("rect")
    .attr("x", 0)
    .attr("y", 85)
    .attr("width", "100")
    .attr("height", "15")
    .attr("fill", "red");


// Avatar du joueur
<<<<<<< Updated upstream
svg.append("circle")
    .attr("id", "joueur")
    .attr("cx", 50)
    .attr("cy", 90)
    .attr("r", 5)
    .attr("fill", "blue");

//déplacement du joueur délimiter dans la zone 
function positionJoueur(e) {


    let pointer = d3.pointer(e);

    if (pointer[1] < 85) {
        d3.select("#joueur")
            .attr("cx", pointer[0])
            .attr("cy", "85");

    } else {
        d3.select("#joueur")
            .attr("cx", pointer[0])
            .attr("cy", pointer[1])
    }



}


//déplacement
svg.on("mousemove", function (e) {
    positionJoueur(e);
})



=======
svg.select("rect")
.append("circle")
.attr("cx",10)
.attr("cy",10)
.attr("r",50)
.attr("fill","blue");


// puis un fantome, qui sera toujours au premier plan (initialement invisible)
// svg.append("use")
//     .attr("id","fantome")
//     .attr("href", "#spirale")
//     .style("display","none")
//     .style("z-index",2)
//     .style("opacity",".5");


// svg.on("mouseenter", function(e) {    
//         positionFantome(e);
//         d3.select("#fantome")
//             .style("display",null)});

// svg.on("mouseleave", function(e) {
//                 d3.select("#fantome")
//                     .style("display","none")
//             } );



// ENNEMIS (q7)
let positionEnnemis=[
    {x:entierAlea(100),y:0, vy:1},
    {x:entierAlea(100),y:0, vy:2},
    {x:entierAlea(100),y:0, vy:3}
];

function entierAlea(n) {
    return Math.floor(Math.random()*n);
}
function vitesseAlea(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

function creationSuppressionEnnemis(){
    let lien = svg.selectAll(".ennemi")
        .data(positionEnnemis);
    lien.enter()
        .append("use")
        .attr("class", "ennemi")
        .attr("href", "#def_ennemi");
    lien.exit()
        .remove();    
    placeEnnemis();
}
function placeEnnemis() {
    svg.selectAll(".ennemi") 
        .attr("transform", d=>`translate(${d.x},${d.y})`);
}
function mouvementEnnemis() {
    positionEnnemis.forEach(d=>{        
        //chaque ennemi se déplace de sa vitesse en y
        d.y+=d.vy;
    })
    //les coordonnées ont été modifiées, on fait la mise à jour
    placeEnnemis();
}
creationSuppressionEnnemis();
setInterval(mouvementEnnemis, 100);

//toutes les 2000ms: un nouvel ennemi est ajouté
setInterval(function(){
    positionEnnemis.push({x:entierAlea(100),y:0, vy:vitesseAlea(1,3)});
    creationSuppressionEnnemis();
}, 2000);

// Si un ennemi touche le bord opposé, le joueur perd une vie (q9)

compteVies();
function compteVies() {
    positionEnnemis.forEach(d=>{        
    if(d.y = 85){
        viesRestantes = viesRestantes-1;
    }
})
}
>>>>>>> Stashed changes
