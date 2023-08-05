var parse = require("dotparser");
//var fs = require('fs')
// var dot = require('graphlib-dot')

export const getGraphData = (data) => {
  const nodes = [];
  const edges = [];

  // var graph = dot.read(fs.readFileSync('./src/data/graph.dot', 'UTF-8'));
  //var graph = fs.readFileSync('./src/data/graph.dot', 'UTF-8');
  // console.log(JSON.stringify(graph))
  //const ast2 = parse(graph);
  //console.log(ast2);

  const ast = parse(data);
  ast[0].children.forEach((obj) => {
    obj.children?.forEach((child, index) => {
      const type = child.type;
      const attrList = child.attr_list;
      const label = attrList?.filter((attr) => attr.id === "label");

      switch (type) {
        case "node_stmt":
          //   if (child.node_id.id.includes("module.")) {
          nodes.push({
            id: child.node_id.id,
            data: { label: label?.[0]?.eq || child.node_id.id },
            position: { x: 0, y: 0 }
          });
          //   }
          break;
        case "edge_stmt":
          const edgeList = child.edge_list || [];
          if (edgeList.length > 1) {
            const source = edgeList[0];
            const target = edgeList[1];
            edges.push({
              id: `edge-${index}`,
              source: source.id,
              target: target.id,
              arrowHeadType: "arrowclosed"
            });
          }
          break;
        default:
          break;
      }
    });
  });
  return [...nodes, ...edges];
};
