let svg = d3.select("svg");

svg.style("background-color", "black");

let coordonnees=[
    {x:25,y:30},
    {x:55,y:60},
    {x:95,y:20},
    {x:5,y:70},
    {x:80,y:95}
];

svg
    .selectAll("path")
    .data(coordonnees)
    .enter()
    .append("path")
    .attr("d", "M0,0 L-10,0 M0,0 L8.1,5.9 M0,0 L8.1,-5.9 M0,0 L-3.1,9.5 M0,0 L-3.1,-9.5")

// alternative avec transform :
    .attr("x", 0) 
    .attr("y", 0) 
    .attr("transform", d=>`translate(${d.x}, ${d.y})`)

    .style("stroke","yellow");


