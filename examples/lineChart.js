
lineChart= {
    data: [
        { date:Date.parse("4/6/2012"), hours:3 },
        { date:Date.parse("4/16/2012"), hours:4 },
        { date:Date.parse("4/26/2012"), hours:2 },
        { date:Date.parse("5/6/2012"), hours:5 },
        { date:Date.parse("5/26/2012"), hours:3 },
        { date:Date.parse("5/30/2012"), hours:6 }
    ],
    width: 500,
    height: 200,
    margin: 50,
    svgGraph: {},
    scaleX: function(){},
    scaleY: function(){},
    createSvgGraph: function(divId) {
     lineChart.svgGraph = d3.select(divId)
        .append("svg:svg")
        .attr("class", "lineChart")
        .attr("width", lineChart.width + lineChart.margin)
        .attr("height", lineChart.height + lineChart.margin)
        .append("svg:g");
    },
    createScales: function() {
        var startDate = Date.parse("4/1/2012");
        var endDate = Date.parse("5/30/2012");
        lineChart.scaleX = d3.time.scale().domain([startDate, endDate]).range([lineChart.margin, lineChart.width]);
        lineChart.scaleY = d3.scale.linear().domain([0, 6]).range([lineChart.height, lineChart.margin]);
    },
    addLine: function() {
        var line = d3.svg.line()
                    .x(function(d) {
                        return lineChart.scaleX(d.date);
                    })
                    .y(function(d) {
                        return lineChart.scaleY(d.hours);
                    });
        lineChart.svgGraph.append("svg:path")
        .attr("class", "line")
        .attr("d", line(lineChart.data));
    },
    addXaxis: function() {
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(lineChart.scaleX)
            .tickSubdivide(0)
            .tickSize(6, 3, 1)
            .ticks(d3.time.weeks, 1)
            .tickFormat(d3.time.format("%m/%d"));

        lineChart.svgGraph.append("svg:g")
                .attr("class", "x-axis")
                .attr("width", lineChart.width)
                .attr("transform", "translate(0," + lineChart.height + ")")
                .call(xAxis);
    },
    addYaxis: function() {
        var yAxis = d3.svg.axis()
                .orient("left")
                .ticks(3)
                .tickSize(6,1)
                .scale(lineChart.scaleY);

        lineChart.svgGraph.append("svg:g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + lineChart.margin + ",0)")
                .call(yAxis);
    },
    addPoints: function() {
        lineChart.svgGraph.selectAll(".trade-point")
                .data(lineChart.data)
                .enter()
                .append("svg:circle")
                .attr("class", "trade-point")
                .attr("cy", function(d) { return lineChart.scaleY(d.hours); })
                .attr("cx", function(d) { return lineChart.scaleX(d.date); })
                .attr("r", 4)
                .on("mouseover", function(d) {
                    $("#tool-tip").html("DPS is : " + d.hours);
                })
                .on("mouseout", function(d) {
                    $("#tool-tip").html();
                });
    },
    setupSlides: function() {
        // Add Line
        lineChart.createSvgGraph("#lineChart-addLine");
        lineChart.createScales();
        lineChart.addLine();

        // X-Axis
        lineChart.createSvgGraph("#lineChart-xAxis");
        lineChart.createScales();
        lineChart.addLine();
        lineChart.addXaxis();

        // Y-Axis
        lineChart.createSvgGraph("#lineChart-yAxis");
        lineChart.createScales();
        lineChart.addLine();
        lineChart.addXaxis();
        lineChart.addYaxis();
        
        // Add Points
        lineChart.createSvgGraph("#lineChart-addPoints");
        lineChart.createScales();
        lineChart.addLine();
        lineChart.addXaxis();
        lineChart.addYaxis();  
        lineChart.addPoints();  
    }

}