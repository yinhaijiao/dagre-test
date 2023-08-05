import * as d3 from "d3";

const graph = {
  nodes: [
    {
      name: "a",
      group: 1
    },
    {
      name: "a",
      group: 1
    },
    {
      name: "a",
      group: 1
    },
    {
      name: "a",
      group: 1
    },
    {
      name: "b",
      group: 8
    }
  ],
  links: [
    {
      source: 1,
      target: 0,
      value: 1
    },
    {
      source: 2,
      target: 0,
      value: 1
    },
    {
      source: 3,
      target: 0,
      value: 1
    },
    {
      source: 4,
      target: 0,
      value: 1
    }
  ]
};
const width = 600;
const height = 600;

const getPosition = (force) => {
  return force.nodes().map(function (node) {
    return {
      name: node.name,
      group: node.group,
      x: node.x,
      y: node.y
    };
  });
};

const color = d3.scale.category20();

const force = d3.layout
  .force()
  .charge(-120)
  .linkDistance(30)
  .size([width, height])
  .on("end", function () {
    var position = getPosition(force);
    console.log(position);
  });

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const drawGraph = (graph) => {
  force.nodes(graph.nodes).links(graph.links).start();

  const link = svg
    .selectAll(".link")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
      return Math.sqrt(d.value);
    });

  const gnodes = svg
    .selectAll("g.gnode")
    .data(graph.nodes)
    .enter()
    .append("g")
    .classed("gnode", true)
    .call(force.drag);

  const node = gnodes
    .append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function (d) {
      return color(d.group);
    });

  node.append("title").text(function (d) {
    return d.name;
  });

  force.on("tick", function () {
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })
      .each(function (d) {});

    gnodes.attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")";
    });
  });
};

drawGraph(graph);
