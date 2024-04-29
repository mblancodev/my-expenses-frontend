import React from "react";

// Define TypeScript interface for the props
interface SliderRailProps {
  getRailProps: () => any;
}

// The SliderRail functional component using TypeScript
export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <div className="react_time_range__rail__outer" {...getRailProps()} />
    <div className="react_time_range__rail__inner" />
  </>
);
