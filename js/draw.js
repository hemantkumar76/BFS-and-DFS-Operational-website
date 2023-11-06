function drawGraph(data) {
  var list = [];

  for (var i = 0; i < data.length; i++) {
    var now = data[i];
    var obj = {
      value: now.value,
      children: [].concat(now.children),
      parent: now.parent,
    };
    list.push(obj);
  }

  var unique = [...new Set(data.map((x) => x.value))];

  var margin = {
      top: 50,
      right: 5,
      bottom: 5,
      left: 20,
    },
    width = 100 * unique.length - margin.right - margin.left,
    height = 100 * unique.length - margin.top - margin.bottom;

  var i = 0;

  var tree = d3.layout.tree().size([height, width]);
  var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.x, d.y];
  });
  var svg = d3
    .select(".graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var root = list[0];

  var nodes = tree.nodes(root),
    links = tree.links(nodes);

  nodes.forEach(function (d) {
    d.y = d.depth * 70;
  });

  var gNode = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  var nodeEnter = gNode
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  var circle = nodeEnter.append("circle").attr("r", 0);

  circle
    .transition()
    .delay(function (d, i) {
      return i * 80;
    })
    .attr("r", 25)
    .style("fill", function (d, i) {
      return d.children || d._children ? "#69b3a2" : "#ffad99";
    })
    .style("visibility", function (d) {
      return d.value == "Empty" ? "hidden" : "visible";
    })
    .duration(1000)
    .ease("elastic");

  var charText = nodeEnter
    .append("text")
    .attr("y", 5)
    .attr("text-anchor", "middle");

  charText
    .transition()
    .delay(function (d, i) {
      return i * 90;
    })
    .text(function (d) {
      return d.value;
    })
    .style("visibility", function (d) {
      return d.value == "Empty" ? "hidden" : "visible";
    });

  //PATH
  var path = svg
    .selectAll("path.link")
    .data(links, function (d) {
      return d.target.id;
    })
    .style("visibility", function (d) {
      return d.target.value == "Empty" ? "hidden" : "visible";
    });

  var pathT = path
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "black")
    .style("visibility", function (d) {
      return d.target.value == "Empty" ? "hidden" : "visible";
    });

  pathT
    .transition()
    .delay(function (d, i) {
      return i * 85;
    })
    .attr("d", diagonal);
}
