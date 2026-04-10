/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileAppChrome from './components/MobileAppChrome';
import LessonViewer from './components/LessonViewer';
import CustomCodeInput from './components/CustomCodeInput';
import AccountModal from './components/AccountModal';
import HelpGuide from './components/HelpGuide';
import ChapterQuizHub from './components/ChapterQuizHub';
import NavigationSearchModal from './components/NavigationSearchModal';
import { lessons as defaultLessons } from './data/lessons';
import { HELP_LESSON_ID } from './data/helpGuide';
import { finalQuizzesByLessonId } from './data/finalQuizzes';
import { buildDeterministicCustomLesson } from './lib/buildCustomLesson';
import {
  getSessionUsername,
  loadProgress,
  saveProgress,
  signOut,
} from './lib/accountStorage';
import { parseChapterQuizNavId } from './lib/lessonProgress';
import { Lesson } from './types';
import { applyThemeClass, getInitialTheme, persistThemeChoice, type Theme } from './lib/theme';

function lessonNavOrder(a: Lesson, b: Lesson) {
  return (a.order ?? 9999) - (b.order ?? 9999);
}

function readInitialSessionProgress(): {
  score: number;
  completed: Set<string>;
  completedSections: Set<string>;
} {
  const u = getSessionUsername();
  if (!u) return { score: 0, completed: new Set(), completedSections: new Set() };
  const p = loadProgress(u);
  if (!p) return { score: 0, completed: new Set(), completedSections: new Set() };
  return {
    score: p.score,
    completed: p.completedQuizIds,
    completedSections: p.completedSectionQuizIds,
  };
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
  const [completedSectionQuizzes, setCompletedSectionQuizzes] = useState<Set<string>>(
    () => new Set(readInitialSessionProgress().completedSections),
  );
  const [customLessons, setCustomLessons] = useState<Lesson[]>([]);
  const [initialCustomCode, setInitialCustomCode] = useState('');
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
      setCompletedSectionQuizzes(new Set());
      return;
    }
    const p = loadProgress(sessionUser);
    if (p) {
      setScore(p.score);
      setCompletedQuizzes(new Set(p.completedQuizIds));
      setCompletedSectionQuizzes(new Set(p.completedSectionQuizIds));
    }
  }, [sessionUser]);

  const allLessons = [...sortedDefaults, ...customLessons];
  const isHelpView = activeLessonId === HELP_LESSON_ID;
  const isCustomView = activeLessonId === 'custom';
  const chapterQuizChapter = parseChapterQuizNavId(activeLessonId);
  const activeLesson = allLessons.find((l) => l.id === activeLessonId);
  const fallbackLessonId = sortedDefaults[0]?.id ?? 'custom';

  const selectLesson = useCallback((id: string) => {
    setActiveLessonId(id);
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      setMobileNavOpen(false);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    // Safari <14 uses addListener/removeListener on MediaQueryList (addEventListener is undefined).
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileNavOpen]);
  const activeLessonEndQuizId =
    activeLesson?.finalQuiz?.id ??
    finalQuizzesByLessonId[activeLesson?.id ?? '']?.id ??
    activeLesson?.quiz?.id ??
    '';

  const handleQuizComplete = useCallback((quizId: string, points: number) => {
    setCompletedQuizzes((prevQ) => {
      if (prevQ.has(quizId)) return prevQ;
      const nextQ = new Set(prevQ).add(quizId);
      setScore((prevS) => {
        const nextS = prevS + points;
        const u = getSessionUsername();
        if (u) saveProgress(u, nextS, Array.from(nextQ), Array.from(completedSectionQuizzes));
        return nextS;
      });
      return nextQ;
    });
  }, [completedSectionQuizzes]);

  const handleSectionQuizComplete = useCallback((sectionQuizId: string, points: number) => {
    setCompletedSectionQuizzes((prevSet) => {
      if (prevSet.has(sectionQuizId)) return prevSet;
      const nextSet = new Set(prevSet).add(sectionQuizId);
      setScore((prevScore) => {
        const nextScore = prevScore + points;
        const u = getSessionUsername();
        if (u) {
          saveProgress(
            u,
            nextScore,
            Array.from(completedQuizzes),
            Array.from(nextSet),
          );
        }
        return nextScore;
      });
      return nextSet;
    });
  }, [completedQuizzes]);

  const handleLessonGenerated = (lesson: Lesson) => {
    setCustomLessons((prev) => [...prev, lesson]);
    selectLesson(lesson.id);
  };

  const handleEditLesson = (code: string) => {
    setInitialCustomCode(code);
    selectLesson('custom');
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
    setActiveLessonId((current) => {
      if (current !== lessonId) return current;
      return sortedDefaults[0]?.id ?? 'custom';
    });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50 lg:h-screen lg:min-h-0 lg:flex-row">
      <AccountModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onSuccess={() => setSessionUser(getSessionUsername())}
      />
      <NavigationSearchModal
        open={navSearchOpen}
        onClose={() => setNavSearchOpen(false)}
        lessons={allLessons}
        onSelectLesson={selectLesson}
        onSelectHelpSection={(sectionId) => {
          setActiveLessonId(HELP_LESSON_ID);
          setHelpScrollTarget(sectionId);
        }}
      />
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/55 lg:hidden"
          aria-label="Close lesson menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
      <MobileAppChrome
        score={score}
        onOpenNav={() => setMobileNavOpen(true)}
        onOpenSearch={() => setNavSearchOpen(true)}
      />
      <Sidebar
        activeLessonId={activeLessonId}
        onSelectLesson={selectLesson}
        score={score}
        customLessons={customLessons}
        completedQuizIds={completedQuizzes}
        completedSectionQuizIds={completedSectionQuizzes}
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
        mobileNavOpen={mobileNavOpen}
        onDismissMobileDrawer={() => setMobileNavOpen(false)}
      />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden lg:h-full">
        {isCustomView ? (
          <div className="flex-1 min-h-0 h-full overflow-hidden">
            <CustomCodeInput onLessonGenerated={handleLessonGenerated} initialCode={initialCustomCode} />
          </div>
        ) : isHelpView ? (
          <HelpGuide
            onBack={() => selectLesson(fallbackLessonId)}
            scrollToSectionId={helpScrollTarget}
            onScrollConsumed={() => setHelpScrollTarget(null)}
            onOpenLesson={(id) => selectLesson(id)}
          />
        ) : chapterQuizChapter ? (
          <ChapterQuizHub
            chapter={chapterQuizChapter}
            lessons={sortedDefaults
              .filter((l) => l.chapter === chapterQuizChapter)
              .sort(lessonNavOrder)}
            completedQuizIds={completedQuizzes}
            completedSectionQuizIds={completedSectionQuizzes}
            onBack={() =>
              selectLesson(
                sortedDefaults.find((l) => l.chapter === chapterQuizChapter)?.id ?? fallbackLessonId,
              )
            }
            onOpenLesson={(id) => selectLesson(id)}
          />
        ) : activeLesson ? (
          <LessonViewer
            lesson={activeLesson}
            onQuizComplete={handleQuizComplete}
            isQuizCompleted={completedQuizzes.has(activeLessonEndQuizId)}
            completedSectionQuizIds={completedSectionQuizzes}
            onSectionQuizComplete={handleSectionQuizComplete}
            onEditLesson={handleEditLesson}
            onReplaceCustomLessonCode={
              activeLesson.id.startsWith('custom-') && !activeLesson.files?.length
                ? handleReplaceCustomLessonCode
                : undefined
            }
            onOpenChapterHub={selectLesson}
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

