import React from "react";
import { Button } from "@ff6wc/ui";

export const Stepper = ({
  currentStep,
  numberOfSteps,
  previousButtonClicked,
  nextButtonClicked,
}: {
  currentStep: number;
  numberOfSteps: number;
  previousButtonClicked: () => void;
  nextButtonClicked: () => void;
}) => {
  const activeColor = (index: number) =>
    currentStep >= index ? "bg-blue-500" : "bg-gray-300";

  return (
    <div className="flex grid-rows-3 pb-4 justify-center place-items-center">
      <Button onClick={previousButtonClicked} variant="primary">
        Previous
      </Button>
      <div className="flex justify-center items-center px-10">
        {Array.from({ length: numberOfSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className={`w-6 h-6 rounded-full ${activeColor(index)}`}></div>
            {index < numberOfSteps - 1 ? (
              <div className={`w-12 h-1 ${activeColor(index)}`}></div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <Button onClick={nextButtonClicked} variant="primary">
        Next
      </Button>
    </div>
  );
};
