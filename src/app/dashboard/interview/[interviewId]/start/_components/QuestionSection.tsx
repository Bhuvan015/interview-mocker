import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection: React.FC<{
  mockInterviewQuestions?: any;
  activeQuestionIndex?: number;
}> = ({ mockInterviewQuestions, activeQuestionIndex = 0 }) => {
    const textToSpeech = (text: string) => {
        if('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else {
            alert('Sorry, yout browser does not support text to speech')
        }
    }
  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions &&
            mockInterviewQuestions?.map((quesion: any, index: number) => {
              return (
                <>
                  <h2
                    className={`p-2 rounded-full text-xs md:test-sm text-center cursor-pointer ${
                      activeQuestionIndex === index
                        ? "bg-primary text-white"
                        : "bg-secondary"
                    }`}
                  >
                    Question #{index + 1}
                  </h2>
                </>
              );
            })}
        </div>
        <h2 className="my-5 text-md md:text-lg ">
          {mockInterviewQuestions?.[activeQuestionIndex]?.question}
        </h2>
        
        <Volume2 onClick={() => textToSpeech(mockInterviewQuestions?.[activeQuestionIndex]?.question)} className={'cursor-pointer'}/>

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-500 my-2">
            Click on record answer when you want to answer the question. At the
            end of the interview we will give you feedback aling with correct
            answer for each of the question
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
