import { useState, useEffect } from 'react';
import { calculateResults, saveResultsToHistory } from '../utils/scoring';

/**
 * Hook personnalisé pour gérer l'état du quiz
 * Gère la progression, les réponses, la persistence localStorage
 */
export default function useQuiz(quizData) {
  const STORAGE_KEY = 'ai-maturometer-progress';

  // État principal
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Chargement de la progression sauvegardée au démarrage
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress) {
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setAnswers(savedProgress.answers);
      setStartTime(savedProgress.startTime);
    } else {
      // Nouveau quiz : initialiser le timestamp
      setStartTime(Date.now());
    }
  }, []);

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    if (answers.length > 0 && !isCompleted) {
      saveProgress({
        currentQuestionIndex,
        answers,
        startTime
      });
    }
  }, [currentQuestionIndex, answers, startTime, isCompleted]);

  /**
   * Enregistre une réponse et passe à la question suivante
   */
  const submitAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Vérifier si c'était la dernière question
    if (currentQuestionIndex === quizData.questions.length - 1) {
      // Quiz terminé : calculer les résultats
      const calculatedResults = calculateResults(newAnswers, quizData.questions);
      setResults(calculatedResults);
      setIsCompleted(true);

      // Sauvegarder dans l'historique
      saveResultsToHistory(calculatedResults);

      // Nettoyer la progression
      clearProgress();
    } else {
      // Passer à la question suivante
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  /**
   * Recommencer le quiz
   */
  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setResults(null);
    setStartTime(Date.now());
    clearProgress();
  };

  /**
   * Calculer le temps écoulé (en minutes)
   */
  const getElapsedTime = () => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 60000); // Minutes
  };

  /**
   * Sauvegarde de la progression dans localStorage
   */
  const saveProgress = (progress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
    }
  };

  /**
   * Chargement de la progression depuis localStorage
   */
  const loadProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Erreur lors du chargement de la progression:', error);
      return null;
    }
  };

  /**
   * Suppression de la progression sauvegardée
   */
  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de la progression:', error);
    }
  };

  /**
   * Récupérer la question actuelle
   */
  const getCurrentQuestion = () => {
    return quizData.questions[currentQuestionIndex] || null;
  };

  /**
   * Progression en pourcentage
   */
  const getProgress = () => {
    return Math.round((currentQuestionIndex / quizData.questions.length) * 100);
  };

  return {
    // État
    currentQuestion: getCurrentQuestion(),
    currentQuestionIndex,
    totalQuestions: quizData.questions.length,
    answers,
    isCompleted,
    results,
    progress: getProgress(),
    elapsedTime: getElapsedTime(),

    // Actions
    submitAnswer,
    restart,

    // Métadonnées
    domains: quizData.domains,
    theme: quizData.theme
  };
}
