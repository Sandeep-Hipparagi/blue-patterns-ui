import { useState } from 'react';
import { Button, Badge } from '@blue-patterns/core';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  tokens?: number;
}

export default function AiChatWorkspaceTemplate() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Analyze the performance impact of transitioning our UI library from Emotion to zero-runtime StyleX static CSS.',
      timestamp: '10:42 AM',
      tokens: 28,
    },
    {
      id: '2',
      sender: 'assistant',
      text: `Based on bundle profiling and runtime traces across 12,000 components:
1. **Zero Runtime Execution:** Elimination of Emotion's JS style injection saves ~42ms of main-thread blocking time during hydration.
2. **Bundle Optimization:** Static CSS extraction via @blue-patterns/core compiles down to atomic classes with 68% higher CSS deduplication.
3. **Core Web Vitals:** INP (Interaction to Next Paint) improves by 34ms p95; LCP improves by 180ms on mobile devices.`,
      timestamp: '10:43 AM',
      tokens: 142,
    },
  ]);
  const [input, setInput] = useState('');
  const [contextRailOpen, setContextRailOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Pro');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: input,
      timestamp: 'Just now',
      tokens: Math.ceil(input.length / 4),
    };
    const replyMsg: Message = {
      id: String(Date.now() + 1),
      sender: 'assistant',
      text: `I have received your instruction regarding "${input.slice(0, 30)}...". Blue-Patterns AI reasoning is processing the request with zero token violations.`,
      timestamp: 'Just now',
      tokens: 38,
    };
    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInput('');
  };

  const totalTokens = messages.reduce((acc, m) => acc + (m.tokens || 0), 0);

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - var(--spacing-32, 128px))',
        backgroundColor: 'var(--color-surface-base)',
        border: '1px solid var(--color-neutral-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Central Chat Stream */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Top Header */}
        <div
          style={{
            padding: 'var(--spacing-3) var(--spacing-4)',
            backgroundColor: 'var(--color-surface-elevated)',
            borderBottom: '1px solid var(--color-neutral-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--typography-size-sm)' }}>
              AI Orchestration Chat
            </span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              aria-label="Select Model"
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--typography-size-xs)',
                fontWeight: 600,
              }}
            >
              <option value="Gemini 2.5 Pro">Gemini 2.5 Pro (Thinking)</option>
              <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
              <option value="DeepSeek R1">DeepSeek R1</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <Badge label={`${totalTokens} Tokens`} variant="neutral" />
            <Button
              label={contextRailOpen ? 'Hide Context' : 'Show Context'}
              variant="secondary"
              size="sm"
              onClick={() => setContextRailOpen(!contextRailOpen)}
            />
          </div>
        </div>

        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            padding: 'var(--spacing-4)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-1)',
              }}
            >
              <div
                style={{
                  padding: 'var(--spacing-3) var(--spacing-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    m.sender === 'user'
                      ? 'var(--color-primary-base)'
                      : 'var(--color-surface-elevated)',
                  color:
                    m.sender === 'user'
                      ? 'var(--color-primary-contrast)'
                      : 'var(--color-text-primary)',
                  border: m.sender === 'assistant' ? '1px solid var(--color-neutral-border)' : 'none',
                  fontSize: 'var(--typography-size-sm)',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.text}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: 'var(--spacing-2)',
                  fontSize: 'var(--typography-size-xs)',
                  color: 'var(--color-text-muted)',
                  paddingInline: 'var(--spacing-1)',
                }}
              >
                <span>{m.timestamp}</span>
                <span>•</span>
                <span>{m.tokens} tokens</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: 'var(--spacing-3) var(--spacing-4)',
            backgroundColor: 'var(--color-surface-elevated)',
            borderTop: '1px solid var(--color-neutral-border)',
            display: 'flex',
            gap: 'var(--spacing-2)',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your instruction or code query..."
            aria-label="Chat query input"
            style={{
              flex: 1,
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--typography-size-sm)',
            }}
          />
          <Button label="Send" variant="primary" size="md" onClick={handleSend} />
        </div>
      </div>

      {/* Collapsible Context Rail */}
      {contextRailOpen && (
        <div
          style={{
            width: '260px',
            backgroundColor: 'var(--color-surface-elevated)',
            borderLeft: '1px solid var(--color-neutral-border)',
            padding: 'var(--spacing-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Context & Memory Rail
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Active Directives:</span>
            <div style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
              • Zero Runtime CSS<br />
              • Strict WCAG 2.1 AA<br />
              • prefers-reduced-motion<br />
              • Pure React 19 ESM
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Referenced Files:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
              <Badge label="AGENTS.md" variant="blue" />
              <Badge label="theme-default.css" variant="neutral" />
              <Badge label="motion.css" variant="neutral" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
