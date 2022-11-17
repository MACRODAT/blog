import React from 'react'
import { useSelector } from 'react-redux';
import TreeMenu from 'react-simple-tree-menu';

const tree = {
  root: { name: 'Root', children: ['child1', 'child2', 'child3'], depth: 0 },
  child1: { name: 'Child 1', children: ['child4'], depth: 1 },
  child2: { name: 'Child 2', depth: 2 },
  child3: { name: 'Child 3', depth: 2 },
  child4: { name: 'Child 4', depth: 3 },
};

const getChildren = (id) => {
  return tree[id].children.map(id => ({ id, height: 30 }));
};

const rowRenderer = ({ id, style }) => {
  const node = tree[id];
  return <div style={style}>{node.name}</div>
};
const treeData = [
    {
      key: 'first-level-node-1',
      label: 'Node 1 at the first level',
     
      nodes: [
        {
          key: 'second-level-node-1',
          label: 'Node 1 at the second level',
          nodes: [
            {
              key: 'third-level-node-1',
              label: 'Last node of the branch',
              nodes: [] // you can remove the nodes property or leave it as an empty array
            },
          ],
        },
      ],
    },
    {
      key: 'first-level-node-2',
      label: 'Node 2 at the first level',
    },
  ];
const testpage = () => {
    let theme = useSelector(state => state.theming.current);

    return (
        <main className="h-full justify-center items-center 
                      grid overflow-x-hidden min-h-fit md:ml-10">
            <div className='self-center p-2 my-10
                            border border-violet-500/20 border-dashed rounded-3xl 
                            drop-shadow-xl bg-s'>
                <h2 className='my-auto text-xl text-center font-regular font2 font-bold text-[#120024]'>
                    test page !
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 my-auto mb-2">
               
                    <TreeMenu data={treeData} /> 
                </div>
            </div>
        </main>
        
    )
}

export default testpage