let svg = d3.select("svg");


svg.style("background-color", "black");

// Panneau d'indication en haut
d3.select("section")
    .append("p")
    .text("Nombre de vies restantes : ");

d3.select("section")
    .append("p")
    .text("Score : ");


// Zone du joueur
d3.select("svg")
    .append("rect")
    .attr("x", 0)
    .attr("y", 85)
    .attr("width", "100")
    .attr("height", "15")
    .attr("fill", "red");


// Avatar du joueur
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



