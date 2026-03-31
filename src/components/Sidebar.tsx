import React, { useMemo } from 'react';
import { lessons } from '../data/lessons';
import { CURRICULUM_TOPIC_GROUPS, topicFeaturedLessonIdSet } from '../data/helpGuide';
import { Lesson } from '../types';
import { cn } from '../lib/utils';
import {
  ArrowLeftRight,
  BookMarked,
  BookOpen,
  Box,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Lock,
  LogIn,
  LogOut,
  Moon,
  Search,
  Sun,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import type { Theme } from '../lib/theme';

const icons = [BookOpen, Code2, Layers, Cpu, Database, GitBranch];

const topicGroupIcons = [ArrowLeftRight, Box, Lock, Zap];

function displayUsername(sessionKey: string): string {
  if (!sessionKey) return '';
  return sessionKey.charAt(0).toUpperCase() + sessionKey.slice(1);
}

function lessonSidebarLabel(lesson: Lesson): string {
  const n = lesson.realLifeApplicationExampleNumber;
  if (n != null) {
    return `Real life Example ${n}: ${lesson.title}`;
  }
  return lesson.title;
}

export default function Sidebar({
  activeLessonId,
  onSelectLesson,
  score,
  customLessons = [],
  sessionUser,
  onOpenAccount,
  onLogout,
  helpLessonId,
  onOpenNavigationSearch,
  theme,
  onToggleTheme,
  onDeleteCustomLesson,
}: {
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
  score: number;
  customLessons?: Lesson[];
  sessionUser: string | null;
  onOpenAccount: () => void;
  onLogout: () => void;
  helpLessonId: string;
  onOpenNavigationSearch: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onDeleteCustomLesson: (lessonId: string) => void;
}) {
  const sortedLessons = useMemo(
    () => [...lessons].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)),
    [],
  );
  const lessonById = useMemo(() => new Map(sortedLessons.map((l) => [l.id, l])), [sortedLessons]);
  const featuredIds = useMemo(() => topicFeaturedLessonIdSet(), []);

  const otherLessons = useMemo(
    () => sortedLessons.filter((l) => !featuredIds.has(l.id)),
    [sortedLessons, featuredIds],
  );

  const otherChapters: string[] = [];
  const seenChapter = new Set<string>();
  for (const l of otherLessons) {
    if (!seenChapter.has(l.chapter)) {
      seenChapter.add(l.chapter);
      otherChapters.push(l.chapter);
    }
  }

  return (
    <div className="flex h-full w-80 flex-col border-r border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="border-b border-slate-200 px-5 pb-5 pt-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-teal-600 p-2 text-white shadow-lg shadow-teal-900/30 dark:shadow-teal-900/50">
            <Code2 size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">JavaViz</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Code Visualizer
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-amber-600 shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-400 dark:hover:border-slate-500 dark:hover:bg-slate-700/80"
            title={theme === 'dark' ? 'Day mode' : 'Night mode'}
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={2} aria-hidden /> : <Moon size={18} strokeWidth={2} aria-hidden />}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2.5 dark:border-slate-700/60 dark:bg-slate-800/40">
          <div className="flex items-baseline gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">Score</span>
            <span className="text-base font-bold tabular-nums leading-none text-amber-600 dark:text-amber-400">{score}</span>
          </div>
          {sessionUser ? (
            <div className="flex min-w-0 max-w-[58%] flex-col items-end gap-0.5 text-right">
              <span
                className="flex max-w-full items-center justify-end gap-1 truncate text-[10px] font-medium text-teal-700 dark:text-teal-400/95"
                title={sessionUser}
              >
                <User size={11} className="shrink-0 opacity-85" aria-hidden />
                <span className="truncate">{displayUsername(sessionUser)}</span>
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-slate-300"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAccount}
              className="inline-flex shrink-0 items-center gap-1 rounded-md border border-slate-300/90 bg-white px-2 py-1 text-[10px] font-semibold text-teal-700 transition-colors hover:border-teal-400/60 hover:bg-teal-50 dark:border-slate-600/80 dark:bg-slate-900/50 dark:text-teal-400/95 dark:hover:border-teal-500/35 dark:hover:bg-slate-800/80 dark:hover:text-teal-300"
            >
              <LogIn size={11} strokeWidth={2} aria-hidden />
              Account
            </button>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onSelectLesson(helpLessonId)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition-colors',
              activeLessonId === helpLessonId
                ? 'border-teal-500/50 bg-teal-600 text-white shadow-md shadow-teal-900/20'
                : 'border-slate-300/90 bg-white text-slate-700 hover:border-teal-400/50 hover:bg-teal-50/80 hover:text-slate-900 dark:border-slate-600/80 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-teal-500/35 dark:hover:bg-slate-800 dark:hover:text-white',
            )}
          >
            <BookMarked size={14} aria-hidden />
            Help
          </button>
          <button
            type="button"
            onClick={onOpenNavigationSearch}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300/90 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-teal-400/50 hover:bg-teal-50/80 hover:text-slate-900 dark:border-slate-600/80 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-teal-500/35 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Search size={14} aria-hidden />
            Find
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <button
          onClick={() => onSelectLesson('custom')}
          className={cn(
            'group flex w-full items-center justify-between rounded-xl border border-teal-400/35 px-4 py-3 text-left text-sm font-bold transition-all duration-200 dark:border-teal-500/30',
            activeLessonId === 'custom'
              ? 'border-teal-500 bg-teal-600 text-white shadow-lg shadow-teal-900/20 dark:border-teal-500'
              : 'bg-teal-50/90 text-teal-800 hover:bg-teal-100 hover:text-teal-950 dark:bg-teal-950/30 dark:text-teal-300 dark:hover:bg-teal-900/50 dark:hover:text-teal-100',
          )}
        >
          <div className="flex items-center gap-2">
            <Code2 size={16} />
            <span>Custom Code</span>
          </div>
          <span className="rounded-full bg-teal-200/80 px-2 py-0.5 text-[10px] uppercase tracking-widest text-teal-900 dark:bg-teal-500/20 dark:text-teal-100">
            NEW
          </span>
        </button>

        {customLessons.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              <Code2 size={14} />
              Your Visualizations
            </div>
            {customLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  'flex items-stretch gap-0.5 rounded-xl transition-all duration-200',
                  activeLessonId === lesson.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                    : 'border border-transparent text-slate-600 dark:text-slate-400',
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelectLesson(lesson.id)}
                  className={cn(
                    'flex min-w-0 flex-1 items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors',
                    activeLessonId !== lesson.id &&
                      'rounded-xl hover:bg-slate-200/80 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-200',
                  )}
                >
                  <span className="truncate pr-2">{lesson.title || 'Custom Code'}</span>
                  {activeLessonId === lesson.id && (
                    <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCustomLesson(lesson.id);
                  }}
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-lg px-2.5 transition-colors',
                    activeLessonId === lesson.id
                      ? 'text-white/90 hover:bg-white/15 hover:text-white'
                      : 'text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400',
                  )}
                  aria-label={`Delete ${lesson.title?.trim() || 'visualization'}`}
                  title="Delete visualization"
                >
                  <Trash2 size={16} strokeWidth={2} aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}

        {CURRICULUM_TOPIC_GROUPS.map((group, gIdx) => {
          const TopicIcon = topicGroupIcons[gIdx % topicGroupIcons.length];
          return (
            <div key={group.title} className="flex flex-col gap-2">
              <div className="mb-1 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500/95">
                <TopicIcon size={14} aria-hidden />
                {group.title}
              </div>
              {group.lessonIds.map((lessonId) => {
                const lesson = lessonById.get(lessonId);
                if (!lesson) return null;
                return (
                  <button
                    key={`${group.title}-${lessonId}`}
                    onClick={() => onSelectLesson(lessonId)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                      activeLessonId === lessonId
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                        : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200',
                    )}
                  >
                    <span className="truncate pr-4">{lessonSidebarLabel(lesson)}</span>
                    {activeLessonId === lessonId && (
                      <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}

        {otherChapters.length > 0 && (
          <div className="border-t border-slate-200/90 pt-2 dark:border-slate-800/80">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600">
              More lessons
            </p>
          </div>
        )}

        {otherChapters.map((chapter, idx) => {
          const Icon = icons[idx % icons.length];
          const chapterLessons = otherLessons.filter((l) => l.chapter === chapter);

          return (
            <div key={chapter} className="flex flex-col gap-2">
              <div className="mb-1 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-500">
                <Icon size={14} />
                {chapter}
              </div>
              {chapterLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                    activeLessonId === lesson.id
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                      : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200',
                  )}
                >
                  <span className="truncate pr-4">{lessonSidebarLabel(lesson)}</span>
                  {activeLessonId === lesson.id && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-800">
        Interactive Java Visualizer
      </div>
    </div>
  );
}
