// The following code was based on this example:
// http://bl.ocks.org/tjdecke/5558084 by Mike Bostock.
var margin = { top: 0,
	       left: 0,
	       right: 0,
	       bottom: 80};

var w = 300 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;

var quantiles=[-4.264891, -3.090232, -1.644854,
	       1.644854, 3.090232, 4.264891];

var colors =["#0000FF","#554CE6", "#AA98CE",
	     "#FFE4B5",
	     "#FF9879", "#FF4C3C", "#FF0000"];

var legendW = (w-20)/(quantiles.length + 1);
var legendH = 20;

var genesets =["34","130","129","9","161","163","148","93","120","170","182","6","147","184","35","180","106"];

var expLab = d3.select("body")
    .append("div")
//    .style("height", 30)
    .style("padding", "2 2px")
    .style("position", "absolute")
    .style("background", "black")
    .style("color", "white")
    .style("opacity", 1);

var svg = d3.select("#heatmap").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");

var update= function() {
    svg.remove();
    var svg = d3.select("#heatmap").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");
}

var heatmapChart = function(tsvFile, q) {

    var colorScale = d3.scale.threshold()
    .domain(q)
	.range(colors);

    d3.tsv(tsvFile,
	   function(error, data) {
	       if (error) throw(error);

	       data.forEach(function(d) {
		   d.gene = +d.gene;
		   d.samp = +d.samp;
		   d.value= +d.value;
	       });

	       var nsamps = d3.max(data, function(d) {
		   return d.samp; });

	       var ngenes = d3.max(data, function(d) {
		   return d.gene; });

	       var sampsAll = data.map(function(d) {
		   return d.sampname; });
	       var samps = sampsAll.slice(0, nsamps);

	       var sampsNum = samps.map(function(d) { return +d; })
	       var nControls= samps.length - d3.sum(sampsNum);

	       var xScale = d3.scale.ordinal()
		   .domain(d3.range(nsamps))
		   .rangeBands([margin.left, w + margin.left]);

	       var yScale = d3.scale.ordinal()
		   .domain(d3.range(ngenes))
		   .rangeBands([margin.top, h + margin.top]);

	       var gridW = xScale.rangeBand();
	       var gridH = yScale.rangeBand();
	       

	       // column labels
	       var colLabels = svg.selectAll(".colLabel")
		   .data(samps);
	       colLabels.enter().append("text")
		   .text(function(d) { return d; })
		   .attr("x", function(d, i) {
		       return xScale(i) + gridW/2;
		   })
		   .attr("y", margin.top + h+10)
		   .style("text-anchor", "middle");
	       
	       // make heatmaps
               var cards = svg.selectAll(".element")
		   .data(data, function(d) {
		       return d.gene+':'+ d.samp;
		   });
	       
               cards.enter().append("rect")
		   .attr("x", function(d) {
 		       return xScale(d.samp-1); })
		   .attr("y", function(d) {
		       return yScale(d.gene-1); })
		   .attr("width", gridW)
		   .attr("height", gridH)
		   .attr("class", "element")
		   .style("fill", function(d) {
		       return colorScale(d.value); });
	       
	       var tempColor;
	       cards.on("mouseover", function(d){
		   tempColor = this.style.fill;

		   d3.select(this)
		       .style("fill", "black")
		       .transition()
		       .duration("0");
		   var disease = d.sampname=="1" ? "Case" : "Control";
		   output = d.genename+", "+disease+ ", "+d3.round(d.value, 2);

		   expLab
		       .style("left", (d3.event.pageX + 5)+"px")
		       .style("top", (d3.event.pageY+ 5) + "px")
		       .html(output);
	       })
		   .on("mouseout", function(d, i){
		       d3.select(this)
			   .style("fill", tempColor)
			   .transition()
			   .duration("0");
		   });
	       
	       // draw a line seperate the cases and controls 
	       svg.append("line")
		   .attr("x1", nControls * gridW + margin.left)
		   .attr("y1", margin.top)
		   .attr('x2', nControls * gridW + margin.left)
		   .attr('y2', margin.top + h)
		   .style("stroke", "white")
		   .style("stroke-width", 2);

	       // make legends
               var legend = svg.selectAll(".legend")
		   .data([-99].concat(quantiles),
			 function(d) { return d; });
               legend.enter().append("g")
		   .attr("class", "legend");
               legend.append("rect")
		   .attr("x", function(d, i) {
		       return i*legendW + 20; })
		   .attr("y", margin.top + h + 30)
		   .attr("width", legendW)
		   .attr("height", legendH)
		   .style("fill", function(d, i) {
		       return colors[i]; });
               legend.append("text")
		   .text(function(d) {
		       return d3.round(d, 2); })
		   .attr("x", function(d, i) {
		       return i * legendW + 20; })
		   .attr("y", margin.top + h + 45 + legendH)
		   .style("text-anchor", "middle");
           });
};
var buttons = d3.select("#buttons")
    .append("table")
    .selectAll("tr")
    .data(genesets)
    .enter()
    .append("tr")
    .append("input")
    .attr("value", function(d) { return d; })
    .attr("type", "button")
    .style("width", 50)
    .style("height", 24)
    .on("click", function(d) {
	d3.selectAll("rect").remove();// better solution?
	d3.selectAll("text").remove();
	file= "set" +d +".tsv";
	heatmapChart(file, quantiles);
    });


	      
