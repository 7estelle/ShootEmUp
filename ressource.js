let svg = d3.select("svg");

svg.style("background-color", "yellow");

//on ajoute un groupe qui sert de "couche principale"
let mainlayer = svg.append("g")

//puis un fantome, qui sera toujours au premier plan (initialement invisible)
svg.append("use")
    .attr("id","fantome")
    .attr("href", "#spirale")
    .style("display","none")
    .style("z-index",2)
    .style("opacity",".5");

//au clique, on ajoute un <use> (dans la couche principale)
svg.on("click", function(e) {
    let pointer = d3.pointer(e);
    mainlayer
        .append("use")
        .attr("href", "#spirale")
        .attr("x", pointer[0])
        .attr("y", pointer[1])
} )


// mouvements de la souris: entrÃ©e, dÃ©placement, sortie. On gÃ¨re la visibilitÃ© et la position du fantome
// fonction annexe pour gÃ©rer la position
function positionFantome(e) {
    let pointer = d3.pointer(e);
    d3.select("#fantome")
        .attr("x", pointer[0])
        .attr("y", pointer[1])
}
//entrÃ©e
svg.on("mouseenter", function(e) {    
    positionFantome(e);
    d3.select("#fantome")
        .style("display",null)
} )
//dÃ©placement
svg.on("mousemove", function(e) {
    positionFantome(e);    
} )
//sortie
svg.on("mouseleave", function(e) {
    d3.select("#fantome")
        .style("display","none")
} )
