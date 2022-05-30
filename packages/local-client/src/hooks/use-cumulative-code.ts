import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
            import React from 'react';
            import { createRoot } from 'react-dom/client';
            var show = (value) => {
              const container = document.querySelector('#root'); 
              const root = createRoot(container) 
              if (typeof value === 'object' && value !== null) {
                if (value.$$typeof && value.props) {
                  root.render(value);
                } else {
                  container.innerHTML = JSON.stringify(value);
                }
              } else {
                container.innerHTML = value;
              }
            };
          `;
    const showFuncNoop = `var show = () => {}`;
    let cumulativeCode: string[] = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode = [...cumulativeCode, showFunc];
        } else {
          cumulativeCode = [...cumulativeCode, showFuncNoop];
        }
        cumulativeCode = [...cumulativeCode, c.content];
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
