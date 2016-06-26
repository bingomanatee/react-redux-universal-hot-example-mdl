import ReactDOM from 'react-dom';

let layout = null;
export default {
  setLayout: (ml) => {
    layout = ml;
    console.log('layout set to ', ml);
  },
  close: () => {
    console.log('drawer closing');
    if (layout) {
      const dn = ReactDOM.findDOMNode(layout);
      if (dn) {
        dn.MaterialLayout.toggleDrawer();
      } else {
        console.log('cannot find dn');
      }
    }
  }
};
