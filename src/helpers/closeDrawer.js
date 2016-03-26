import ReactDOM from 'react-dom';

let layout = null;
export default {
  setLayout: (ml) => {
    layout = ml;
  },
  close: () => {
    if (layout) {
      const dn = ReactDOM.findDOMNode(layout);
      if (dn) {
        dn.MaterialLayout.toggleDrawer();
      }
    }
  }
};
