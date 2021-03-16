import React from 'react';

export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="nav-bar">
        <div className="nav-logo-wrapper">
          <span>Squad Management Tool</span>
        </div>
        <div className="nav-user-wrapper">
          <span>Matheus Alves</span>
          <div>
            <span>MA</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
