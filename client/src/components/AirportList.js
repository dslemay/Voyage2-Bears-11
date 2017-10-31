import React from 'react';
import Paper from 'material-ui/Paper';
import { Menu, MenuItem } from 'material-ui/Menu';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

function AirportList() {
    return (
        <div>
        <Paper style={style}>
          <Menu>
            <MenuItem primaryText="SFO" />
            <MenuItem primaryText="ATL" />
            <MenuItem primaryText="LAX" />
            <MenuItem primaryText="ORD" />
            <MenuItem primaryText="DFW" />
            <MenuItem primaryText="JFK" />
          </Menu>
        </Paper>
      </div>
    );
}
  
export default AirportList;