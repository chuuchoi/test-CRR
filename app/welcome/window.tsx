import React from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeList as List } from 'react-window';


const Row = (props:any) => (
  <div className={props.index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={props.style}>
    {/* {(()=>{console.log(props)})()} */}
    RowRowRow {props.index}
  </div>
);

export const Example = () => (
  <List style={{float:"right", border:'1px solid'}}
    className="List"
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);

