import React, { useState } from 'react';

const steps = [
  { title: 'Decide', content: 'Deciding the Gym' },
  { title: 'Step 2', content: 'Content for Step 2' },
  { title: 'Step 3', content: 'Content for Step 3' },
  { title: 'Step 4', content: 'Content for Step 4' },
];

const CustomStepper = () => {
  const [currentStep, setCurrentStep] = useState(-1);

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    alert('Step completed!');
  };

  const progressPercentage = currentStep === -1 ? 0 : ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {currentStep === -1 ? (
        <div className="flex items-center justify-center">
          <button
            onClick={handleStart}
            className="py-2 px-4 bg-blue-600 text-white rounded"
          >
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div
                      className={`h-full ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
            <p>{steps[currentStep].content}</p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Back
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="py-2 px-4 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="py-2 px-4 bg-green-600 text-white rounded"
              >
                Complete
              </button>
            )}
          </div>

          <div className="mt-4 mb-4">
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-600 h-full rounded"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-right mt-2">{progressPercentage}% completed</p>
          </div>

          {currentStep === steps.length - 1 && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
              <h2 className="text-xl font-bold">Congratulations!</h2>
              <p>You have completed all the steps.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomStepper;