
import React, { useEffect, useState, useCallback } from 'react';
import BackButton from './BackButton';
import Task from './Task';
import {
  clearAnswersByIds,
  getUserInputs
} from '../utils/storage';
import '../styles/tasksPage.css';
import DailyProgress from "./DailyProgress";

function TasksPage({ tasks, goBack, rangeLabel }) {
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [totalWordCount, setTotalWordCount] = useState(0);

  const recalcProgress = useCallback(() => {
    let total = 0;
    let correct = 0;

    tasks.forEach(task => {
      const words = task.content.filter(item => item.type === 'word');
      total += words.length;

      const saved = getUserInputs(task.id);
      if (saved && Array.isArray(saved[0])) {
        correct += saved[0].length;
      }
    });

    setCorrectWordCount(correct);
    setTotalWordCount(total);
  }, [tasks]);

  useEffect(() => {
    recalcProgress();

    const handleProgressUpdate = () => {
      recalcProgress();
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);

    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, [recalcProgress]);

  const handleReset = () => {
    const taskIds = tasks.map((t) => t.id);
    clearAnswersByIds(taskIds);
    setCorrectWordCount(0);
    setTotalWordCount(0);
    window.location.reload();
  };

  if (!tasks || tasks.length === 0) {
    return <div>Нет заданий</div>;
  }

  const percentRead =
    totalWordCount > 0
      ? Math.round((correctWordCount / totalWordCount) * 100)
      : 0;

  return (
    <div className="task-container">
      <BackButton />
      <button onClick={goBack} className="back-link task-back-button">
        ← Назад к выбору
      </button>

      <div className="percent-bar-wrapper">
        <p>
          <strong className="task-strong">
            Прочитано слов: {correctWordCount} из {totalWordCount}. ({percentRead}%)
          </strong>
          <DailyProgress />
        </p>

        <div className="percent-bar">
          <div
            className="percent-bar-fill"
            style={{ width: `${percentRead}%` }}
          />
        </div>
      </div>

      <hr />

      <div className="task-grid">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <Task task={task} />
          </div>
        ))}
      </div>

      <br />

      <button onClick={goBack} className="back-link task-back-button">
        ← Назад к выбору
      </button>

      <div className="reset-button-contaner">
        <button onClick={handleReset} className="reset-button">
          Сбросить прочитанные
        </button>
      </div>
    </div>
  );
}

export default TasksPage;
