import React from 'react';

function OptionButton() {
  return (
    <div className="fab">
      {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-lg btn-circle btn-info"
      >
        F
      </div>

      {/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
      <div className="fab-close">
        Close <span className="btn btn-circle btn-lg btn-error">✕</span>
      </div>

      {/* buttons that show up when FAB is open */}
      <div>
        Label A <button className="btn btn-lg btn-circle">A</button>
      </div>
      <div>
        Label B <button className="btn btn-lg btn-circle">B</button>
      </div>
      <div>
        Label C <button className="btn btn-lg btn-circle">C</button>
      </div>
    </div>
  );
}

export default OptionButton;
