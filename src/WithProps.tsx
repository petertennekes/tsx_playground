import React from "react";
import classnames from "classnames";

function WithProps({ children, className, ...props }: any) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ...child.props,
      className: classnames(className, props.className),
      ...props,
    });
  });
}
export default WithProps;
