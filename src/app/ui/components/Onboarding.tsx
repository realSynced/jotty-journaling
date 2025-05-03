"use client";

import { useState } from "react";
import { signup, login } from "@/app/login/action";

export default function OnboardingModal() {
  const [interests, setInterests] = useState<string>("");
  const [goals, setGoals] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [personalizing, setPersonalizing] = useState<boolean>(false);
  const [personalized, setPersonalized] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [interestsError, setInterestsError] = useState<string>("");
  const [goalsError, setGoalsError] = useState<string>("");
  const [error, setError] = useState<{
    email: string;
    username: string;
    password: string;
  } | null>(null);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function validateQuestion() {
    switch (questionNumber) {
      case 1:
        if (!interests) {
          setInterestsError("Please enter your interests.");
          return false;
        }
        if (!goals) {
          setGoalsError("Please enter your goals.");
          return false;
        }
        if (interests.length < 10) {
          setInterestsError("Interests must be at least 10 characters long.");
          return false;
        }
        if (goals.length < 10) {
          setGoalsError("Goals must be at least 10 characters long.");
          return false;
        }
        return true;
      case 2:
        return !!interests && !!goals;
      case 3:
        return !!interests && !!goals;
      default:
        return false;
    }
  }

  async function backQuestion() {
    if (questionNumber <= 1) return;
    setQuestionNumber(questionNumber - 1);
    if (personalized && questionNumber === 3) {
      setQuestionNumber(questionNumber - 2);
      setPersonalized(false);
    }
  }
  async function nextQuestion() {
    if (!(await validateQuestion())) {
      console.log("validation failed");
      return;
    }
    if (questionNumber === 3) {
      if (await validateQuestion()) {
        await handleSignUp();
      }
      return;
    }
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

  async function handleSignUp() {
    console.log("Signing up with:", { email, username, password });
    setDisabled(true);
    setSubmitted(true);

    // Call the signup function with the provided email, username, and password
    await signup(undefined, email, password, username, interests, goals);

    // After successful signup, you can redirect or perform any other action
    // For example, redirect to the journal page
  }

  return (
    <OnboardingParent
      questionNumber={questionNumber}
      disabled={disabled}
      backQuestion={backQuestion}
      nextQuestion={nextQuestion}
    >
      {questionNumber === 1 && (
        <InterestsModal
          {...{
            interests,
            setInterests,
            goals,
            setGoals,
            interestsError,
            goalsError,
            setInterestsError,
            setGoalsError,
          }}
        />
      )}
      {questionNumber === 2 && <PersonalizingModal />}
      {questionNumber === 3 && (
        <SignUpModal
          {...{
            email,
            username,
            password,
            setEmail,
            setUsername,
            setPassword,
            error,
            setError,
          }}
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
          {questionNumber === 3 ? "Sign Up" : "Continue"}
        </button>
      </div>
    </div>
  );
}

function InterestsModal({
  interests,
  goals,
  setGoals,
  setInterests,
  interestsError = "",
  goalsError = "",
  setInterestsError,
  setGoalsError,
}: {
  interests?: string;
  goals?: string;
  setGoals?: (value: string) => void;
  setInterests?: (value: string) => void;
  interestsError?: string;
  goalsError?: string;
  setInterestsError?: (value: string) => void;
  setGoalsError?: (value: string) => void;
}) {
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
            value={interests}
            onChange={(e) => {
              setInterests?.(e.target.value);
              setInterestsError?.(""); // Clear error on change
            }}
            maxLength={200}
          />
          {interestsError && (
            <p className="text-red-500 -mt-2">{interestsError}</p>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">
            What are your goals for journaling?
          </p>
          <textarea
            className="resize-none w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            rows={3}
            value={goals}
            onChange={(e) => {
              setGoals?.(e.target.value);
              setGoalsError?.(""); // Clear error on change
            }}
            maxLength={200}
          />
          {goalsError && <p className="text-red-500 -mt-2">{goalsError}</p>}
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
  error,
}: {
  email: string;
  setEmail: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error?: { email: string; username: string; password: string } | null;
  setError?: (
    value: { email: string; username: string; password: string } | null
  ) => void;
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
