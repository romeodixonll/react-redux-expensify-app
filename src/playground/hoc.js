/** @format */

// /** @format */

// //Higher Order component (HOC) -- A component (HOC) that renders another component
// //Reuse code
// //render hijacking
// //prop manipulation
// //abstract state
// import React from 'react';

// import ReactDOM from 'react-dom';

// const Info = (props) => (
//   <div>
//     <h1>Info</h1>
//     <p>the info is: {props.info}</p>
//   </div>
// );

// const withAdminWarning = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       { props.isAdmin && <p>This is private info. Please don't share!</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };

// const requireAuthentication = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       {!props.isAuthenticated && <p>Please login</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };

// //requireAuthentication
// const AuthInfo = requireAuthentication(Info)
// const AdminInfo = withAdminWarning(Info);
// // ReactDOM.render(
// //   <AdminInfo isAdmin={true} info='There are the details' />,
// //   document.getElementById('app')
// // );
// ReactDOM.render(
//   <AuthInfo isAuthenticated={true} info='There are the details' />,
//   document.getElementById('app')
// );

//Higher Order component A component Hoc that renders another component
//Reuse code
//render hijacking
//prop manipulation
//abstract state

import React from 'react';
import ReactDOM from 'react-dom';
const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>the info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info please dont share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to view the info</p>
      )}
    </div>
  );
};
// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo isAdmin={false} info='There are the details' />,
//   document.getElementById('app')
// );
ReactDOM.render(
  <AuthInfo isAuthenticated={false} info='There are the details' />,
  document.getElementById('app')
);
