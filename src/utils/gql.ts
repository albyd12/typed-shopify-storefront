interface GqlNode {
  [key: string]: any;
}

interface Edge {
  node: GqlNode;
}

interface EdgesArray {
  edges: Edge[];
}

function isEdgesArray(obj: any): obj is EdgesArray {
  return "edges" in obj && Array.isArray(obj.edges);
}

export function parseGql<T>(data: unknown): T {
  const processNode = (node: unknown): any => {
    if (Array.isArray(node)) {
      return node.map((item) => processNode(item));
    } else if (
      typeof node === "object" &&
      node !== null &&
      isEdgesArray(node)
    ) {
      return node.edges.map((edge) => processNode(edge.node));
    } else if (typeof node === "object" && node !== null) {
      const newNode: { [key: string]: any } = {};
      Object.entries(node).forEach(([key, value]) => {
        newNode[key] = processNode(value);
      });
      return newNode;
    }
    return node;
  };
  return processNode(data) as T;
}
