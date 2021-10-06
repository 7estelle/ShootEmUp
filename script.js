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

//on ajoute un groupe qui sert de "couche principale"
// svg.select("rect")
// .append("g");

// Avatar du joueur
svg.select("rect")
.append("circle")
.attr("cx",10)
.attr("cy",10)
.attr("r",50)
.attr("fill","blue");


//puis un fantome, qui sera toujours au premier plan (initialement invisible)
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