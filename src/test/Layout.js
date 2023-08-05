import * as cola from "webcola";

export const runLayout = ({ graph, width = 150, height = 50 }) => {
  const nodeIndex = {};
  const nodes = graph.nodes.map((d, i) => {
    nodeIndex[d.uuid] = i;
    return {
      ...d,
      ...d.size,
      ...d.position
    };
  });
  const edges = graph.edges.map((d) => ({
    ...d,
    source: nodeIndex[d.source],
    target: nodeIndex[d.target]
  }));

  const layout = new cola.Layout()
    .size([width, height])
    .linkDistance(200)
    .nodes(nodes)
    .links(edges);
  layout.start();

  return { nodes, edges };
};
