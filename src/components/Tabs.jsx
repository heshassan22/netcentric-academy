import { useState, Children } from 'react';

export function Tabs({ children }) {
  const tabs = Children.toArray(children).filter((c) => c && typeof c === 'object' && c.props);
  const [active, setActive] = useState(0);
  return (
    <div className="tabs">
      <div className="tabbar">
        {tabs.map((t, i) => (
          <button key={i} type="button" className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}>
            {t.props.label || 'Tab ' + (i + 1)}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => {
        const isResult = (t.props.label || '').toLowerCase() === 'result';
        return (
          <div key={i} className={'tab-panel' + (isResult ? ' result' : '') + (i === active ? ' is-active' : '')}>
            {t.props.children}
          </div>
        );
      })}
    </div>
  );
}

export function Tab({ children }) {
  return <>{children}</>;
}
