"use client";

import { q } from "framer-motion/client";
import { useState } from "react";

export default function OnboardingModal() {
  const [interests, setInterests] = useState<string>("");
  const [goals, setGoals] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [personalizing, setPersonalizing] = useState<boolean>(false);
  const [personalized, setPersonalized] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function backQuestion() {
    if (questionNumber <= 1) return;
    setQuestionNumber(questionNumber - 1);
    if (personalized && questionNumber === 3) {
      setQuestionNumber(questionNumber - 2);
      setPersonalized(false);
    }
  }
  async function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
    if (questionNumber === 1) {
      setTimeout(() => {
        setDisabled(true);
        setPersonalizing(true);
        setPersonalizing(false);
        setPersonalized(true);
        setQuestionNumber(questionNumber + 2);
        setDisabled(false);
      }, 2000); // 2 seconds delay for personalization
    }
  }

  return (
    <OnboardingParent
      questionNumber={questionNumber}
      disabled={disabled}
      backQuestion={backQuestion}
      nextQuestion={nextQuestion}
    >
      {questionNumber === 1 && <InterestsModal />}
      {questionNumber === 2 && <PersonalizingModal />}
      {questionNumber === 3 && (
        <SignUpModal
          {...{ email, username, password, setEmail, setUsername, setPassword }}
        />
      )}
    </OnboardingParent>
  );
}

function OnboardingParent({
  children,
  questionNumber,
  disabled,
  backQuestion,
  nextQuestion,
}: {
  children: React.ReactNode;
  questionNumber: number;
  disabled?: boolean;
  backQuestion?: () => void;
  nextQuestion?: () => void;
}) {
  return (
    <div className="bg-cream bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full">
      {children}
      <div>
        {questionNumber > 1 && (
          <button
            onClick={backQuestion}
            className={`mt-4 w-full py-2 bg-caramel/50 text-white font-medium rounded-lg hover:bg-caramel/75 hover:cursor-pointer transition-colors ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Back
          </button>
        )}
        <button
          onClick={nextQuestion}
          className={`mt-4 w-full py-2 bg-caramel text-white font-medium rounded-lg hover:bg-caramel/50 hover:cursor-pointer transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function InterestsModal() {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-caramel mb-6 text-center">
        Let's Get Started
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">
            What are your interests?
          </p>
          <textarea
            className="resize-none w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">
            What are your goals for journaling?
          </p>
          <textarea
            className="resize-none w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

function PersonalizingModal() {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-caramel mb-6 text-center">
        personalizing your
        <br />
        prompts...
      </h2>
    </div>
  );
}

function SignUpModal({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}: {
  email: string;
  setEmail: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-caramel mb-6 text-center">
        Sign Up
      </h2>
      <form className="space-y-1">
        <div className="space-y-2 flex space-x-4">
          <div>
            <p className="text-lg font-medium text-caramel">Email</p>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1 border border-jotty-sage rounded-full focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            />
          </div>
          <div>
            <p className="text-lg font-medium text-caramel">Username</p>
            <input
              required
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-1 border border-jotty-sage rounded-full focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">Password</p>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1 border border-jotty-sage rounded-full focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
          />
        </div>
      </form>
    </div>
  );
}
