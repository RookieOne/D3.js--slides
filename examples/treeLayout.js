treeLayout = {
  data: {
    name: "Foobar, Inc.",
    children:[
        {
            name:"Accounting",
            children: [
                { name: "Bob", salary: 50000 },
                { name: "Sue", salary: 50000 }
            ]
        },
        {
            name:"Computer Science",
            children: [
                { name: "Joe", salary: 150000 },
                { name: "Bubba", salary: 30000 }
            ]
        }
    ]
  },
  width: 700,
  height: 400,
  margin: 30,
  createSvgGraph: function(divId) {
    treeLayout.svgChart = d3.select(divId)
                    .append("svg:svg")
                    .attr("width", treeLayout.width + treeLayout.margin)
                    .attr("height", treeLayout.height + treeLayout.margin)
                    .append("svg:g")
                    .attr("transform", "translate(0, 20)");
  },
  createLayout: function() {
    treeLayout.tree = d3.layout.tree().size([treeLayout.width - treeLayout.margin, treeLayout.height - treeLayout.margin]);
    treeLayout.nodes = treeLayout.tree.nodes(treeLayout.data);
    treeLayout.links = treeLayout.tree.links(treeLayout.nodes);
    treeLayout.diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.x, d.y];
            });
  },
  addNodes: function() {
    treeLayout.node = treeLayout.svgChart.selectAll("g.node")
            .data(treeLayout.nodes)
            .enter()
            .append("svg:g")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

    treeLayout.node.append("svg:circle")
            .attr("r", 3.5);
  },
  addNodeLabels: function() {
    treeLayout.node.append("svg:text")
      .attr("class", "node-label")
      .attr("dx", 10)
      .attr("dy", 6)
      .text(function(d) { return d.name; });   
  },
  addLinks: function() {
    treeLayout.svgChart.selectAll("pathlink")
          .data(treeLayout.links)
          .enter()
          .append("svg:path")
          .attr("class", "link")
          .attr("d", treeLayout.diagonal); 
  },
  setupSlides: function() {
    treeLayout.createSvgGraph("#tree-addNodes");
    treeLayout.createLayout();
    treeLayout.addNodes();

    treeLayout.createSvgGraph("#tree-addNodeLabels");
    treeLayout.createLayout();
    treeLayout.addNodes();        
    treeLayout.addNodeLabels();     

    treeLayout.createSvgGraph("#tree-addLinks");
    treeLayout.createLayout();
    treeLayout.addLinks();
    treeLayout.addNodes();        
    treeLayout.addNodeLabels();  
        
  }
}