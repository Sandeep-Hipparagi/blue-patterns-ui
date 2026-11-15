import React, { useState } from 'react';
import { Button, Badge, Dialog } from '@blue-patterns/core';

interface Task {
  id: string;
  title: string;
  description: string;
  column: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'P0' | 'P1' | 'P2';
  assignee: string;
  points: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'TASK-101',
    title: 'Migrate Button component to StyleX static CSS',
    description: 'Compile Button variant and tone styles down to atomic classes wrapped in @layer astryx-base.',
    column: 'done',
    priority: 'P0',
    assignee: 'Alex',
    points: 5,
  },
  {
    id: 'TASK-102',
    title: 'Implement WAAPI Spring Keyframe Generator',
    description: 'Calculate damped harmonic oscillator keyframes for Element.animate() with reduced-motion checks.',
    column: 'done',
    priority: 'P1',
    assignee: 'Elena',
    points: 8,
  },
  {
    id: 'TASK-103',
    title: 'Ship 8 Brand Theme Packs with WCAG 2.1 AA Compliance',
    description: 'Tune default, obsidian, editorial, enterprise, glass, forest, cobalt, and high-contrast color palettes.',
    column: 'in-progress',
    priority: 'P0',
    assignee: 'Marcus',
    points: 13,
  },
  {
    id: 'TASK-104',
    title: 'Build MCP Server Tools (ds_contract, ds_validate_jsx)',
    description: 'Enable autonomous AI agents to query machine-readable contracts and audit AST token usage.',
    column: 'review',
    priority: 'P1',
    assignee: 'Sophia',
    points: 8,
  },
  {
    id: 'TASK-105',
    title: 'Playwright Visual Regression Suite for Studio',
    description: 'Capture Desktop and Mobile viewport screenshots in Light and Dark modes with axe-core 0 violations.',
    column: 'todo',
    priority: 'P2',
    assignee: 'Alex',
    points: 5,
  },
];

const COLUMNS = [
  { id: 'todo', title: 'To Do', badgeTone: 'neutral' as const },
  { id: 'in-progress', title: 'In Progress', badgeTone: 'primary' as const },
  { id: 'review', title: 'Code Review', badgeTone: 'warning' as const },
  { id: 'done', title: 'Completed', badgeTone: 'success' as const },
];

export default function KanbanSprintBoardTemplate() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const moveTask = (taskId: string, targetCol: Task['column']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: targetCol } : t))
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, column: targetCol } : null));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-6)',
        backgroundColor: 'var(--color-surface-base)',
        border: '1px solid var(--color-neutral-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-6)',
      }}
    >
      {/* Board Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--typography-size-xl, 1.25rem)', fontWeight: 800 }}>
            Sprint 42: Blue-Patterns Design System Launch
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Track engineering milestones, PR approvals, and autonomous agent tasks.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Badge label="Sprint Active" variant="blue" />
          <Badge label="39 Story Points" variant="neutral" />
        </div>
      </div>

      {/* Columns Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--spacing-4)',
          alignItems: 'start',
        }}
      >
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-3)',
                minHeight: '400px',
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--typography-size-xs)', textTransform: 'uppercase' }}>
                  {col.title}
                </span>
                <Badge
                  label={String(colTasks.length)}
                  variant={col.id === 'done' ? 'success' : col.id === 'in-progress' ? 'blue' : col.id === 'review' ? 'warning' : 'neutral'}
                />
              </div>

              {/* Tasks List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    style={{
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-neutral-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: 'var(--spacing-3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-2)',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-muted)' }}>
                        {task.id}
                      </span>
                      <Badge
                        label={task.priority}
                        variant={task.priority === 'P0' ? 'error' : task.priority === 'P1' ? 'warning' : 'neutral'}
                      />
                    </div>

                    <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, lineHeight: 1.3 }}>
                      {task.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-1)' }}>
                      <div
                        style={{
                          width: 'var(--spacing-5)',
                          height: 'var(--spacing-5)',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--color-primary-base)',
                          color: 'var(--color-primary-contrast)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'var(--typography-size-xs)',
                          fontWeight: 700,
                        }}
                      >
                        {task.assignee[0]}
                      </div>
                      <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        {task.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      <Dialog
        isOpen={Boolean(selectedTask)}
        onOpenChange={(open: boolean) => !open && setSelectedTask(null)}
        width={480}
      >
        {selectedTask && (
          <div style={{ padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-muted)' }}>
                {selectedTask.id}
              </span>
              <Badge label={selectedTask.priority} variant="warning" />
            </div>

            <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)' }}>{selectedTask.title}</h3>
            <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
              {selectedTask.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-2)' }}>
              <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Move to Column:</span>
              <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
                {COLUMNS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => moveTask(selectedTask.id, c.id as Task['column'])}
                    style={{
                      flex: 1,
                      padding: 'var(--spacing-1)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-neutral-border)',
                      backgroundColor: selectedTask.column === c.id ? 'var(--color-primary-base)' : 'var(--color-surface-subtle)',
                      color: selectedTask.column === c.id ? 'var(--color-primary-contrast)' : 'var(--color-text-secondary)',
                      fontSize: 'var(--typography-size-xs)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-3)' }}>
              <Button label="Close" variant="secondary" size="sm" onClick={() => setSelectedTask(null)} />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
