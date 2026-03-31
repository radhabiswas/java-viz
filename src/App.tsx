/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import LessonViewer from './components/LessonViewer';
import CustomCodeInput from './components/CustomCodeInput';
import AccountModal from './components/AccountModal';
import HelpGuide from './components/HelpGuide';
import NavigationSearchModal from './components/NavigationSearchModal';
import { lessons as defaultLessons } from './data/lessons';
import { HELP_LESSON_ID } from './data/helpGuide';
import { buildDeterministicCustomLesson } from './lib/buildCustomLesson';
import {
  getSessionUsername,
  loadProgress,
  saveProgress,
  signOut,
} from './lib/accountStorage';
import { Lesson } from './types';
import { applyThemeClass, getInitialTheme, persistThemeChoice, type Theme } from './lib/theme';

function lessonNavOrder(a: Lesson, b: Lesson) {
  return (a.order ?? 9999) - (b.order ?? 9999);
}

function readInitialSessionProgress(): { score: number; completed: Set<string> } {
  const u = getSessionUsername();
  if (!u) return { score: 0, completed: new Set() };
  const p = loadProgress(u);
  if (!p) return { score: 0, completed: new Set() };
  return { score: p.score, completed: p.completedQuizIds };
}

export default function App() {
  const sortedDefaults = [...defaultLessons].sort(lessonNavOrder);
  const [activeLessonId, setActiveLessonId] = useState(() => sortedDefaults[0]?.id ?? 'custom');
  const [sessionUser, setSessionUser] = useState<string | null>(() => getSessionUsername());
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const [score, setScore] = useState(() => readInitialSessionProgress().score);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(
    () => new Set(readInitialSessionProgress().completed),
  );
  const [customLessons, setCustomLessons] = useState<Lesson[]>([]);
  const [initialCustomCode, setInitialCustomCode] = useState('');
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [helpScrollTarget, setHelpScrollTarget] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useLayoutEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      persistThemeChoice(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!sessionUser) {
      setScore(0);
      setCompletedQuizzes(new Set());
      return;
    }
    const p = loadProgress(sessionUser);
    if (p) {
      setScore(p.score);
      setCompletedQuizzes(new Set(p.completedQuizIds));
    }
  }, [sessionUser]);

  const allLessons = [...sortedDefaults, ...customLessons];
  const isHelpView = activeLessonId === HELP_LESSON_ID;
  const isCustomView = activeLessonId === 'custom';
  const activeLesson = allLessons.find((l) => l.id === activeLessonId);
  const fallbackLessonId = sortedDefaults[0]?.id ?? 'custom';

  const handleQuizComplete = useCallback((quizId: string, points: number) => {
    setCompletedQuizzes((prevQ) => {
      if (prevQ.has(quizId)) return prevQ;
      const nextQ = new Set(prevQ).add(quizId);
      setScore((prevS) => {
        const nextS = prevS + points;
        const u = getSessionUsername();
        if (u) saveProgress(u, nextS, Array.from(nextQ));
        return nextS;
      });
      return nextQ;
    });
  }, []);

  const handleLessonGenerated = (lesson: Lesson) => {
    setCustomLessons((prev) => [...prev, lesson]);
    setActiveLessonId(lesson.id);
  };

  const handleEditLesson = (code: string) => {
    setInitialCustomCode(code);
    setActiveLessonId('custom');
  };

  const handleReplaceCustomLessonCode = (lessonId: string, newCode: string) => {
    setCustomLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? { ...buildDeterministicCustomLesson(newCode), id: l.id, title: l.title }
          : l,
      ),
    );
  };

  const handleDeleteCustomLesson = (lessonId: string) => {
    if (!window.confirm('Remove this visualization from your list?')) return;
    setCustomLessons((prev) => prev.filter((l) => l.id !== lessonId));
    setActiveLessonId((current) =>
      current === lessonId ? sortedDefaults[0]?.id ?? 'custom' : current,
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <AccountModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onSuccess={() => setSessionUser(getSessionUsername())}
      />
      <NavigationSearchModal
        open={navSearchOpen}
        onClose={() => setNavSearchOpen(false)}
        lessons={allLessons}
        onSelectLesson={setActiveLessonId}
        onSelectHelpSection={(sectionId) => {
          setActiveLessonId(HELP_LESSON_ID);
          setHelpScrollTarget(sectionId);
        }}
      />
      <Sidebar
        activeLessonId={activeLessonId}
        onSelectLesson={setActiveLessonId}
        score={score}
        customLessons={customLessons}
        sessionUser={sessionUser}
        onOpenAccount={() => setAccountModalOpen(true)}
        onLogout={() => {
          signOut();
          setSessionUser(null);
        }}
        helpLessonId={HELP_LESSON_ID}
        onOpenNavigationSearch={() => setNavSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onDeleteCustomLesson={handleDeleteCustomLesson}
      />
      <main className="flex-1 h-full min-h-0 overflow-hidden flex flex-col">
        {isCustomView ? (
          <div className="flex-1 min-h-0 h-full overflow-hidden">
            <CustomCodeInput onLessonGenerated={handleLessonGenerated} initialCode={initialCustomCode} />
          </div>
        ) : isHelpView ? (
          <HelpGuide
            onBack={() => setActiveLessonId(fallbackLessonId)}
            scrollToSectionId={helpScrollTarget}
            onScrollConsumed={() => setHelpScrollTarget(null)}
            onOpenLesson={(id) => setActiveLessonId(id)}
          />
        ) : activeLesson ? (
          <LessonViewer
            lesson={activeLesson}
            onQuizComplete={handleQuizComplete}
            isQuizCompleted={completedQuizzes.has(activeLesson.quiz?.id || '')}
            onEditLesson={handleEditLesson}
            onReplaceCustomLessonCode={
              activeLesson.id.startsWith('custom-') && !activeLesson.files?.length
                ? handleReplaceCustomLessonCode
                : undefined
            }
          />
        ) : (
          <div className="flex flex-1 items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-500">
            Select a lesson from the sidebar.
          </div>
        )}
      </main>
    </div>
  );
}

