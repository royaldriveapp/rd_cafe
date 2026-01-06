import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  cooldownMs: number;
}

interface RateLimitState {
  attempts: number;
  firstAttemptTime: number | null;
  cooldownUntil: number | null;
}

export const useRateLimit = (config: RateLimitConfig = { maxAttempts: 3, windowMs: 60000, cooldownMs: 30000 }) => {
  const [state, setState] = useState<RateLimitState>({
    attempts: 0,
    firstAttemptTime: null,
    cooldownUntil: null,
  });

  const isRateLimited = useCallback(() => {
    const now = Date.now();

    // Check if in cooldown
    if (state.cooldownUntil && now < state.cooldownUntil) {
      return true;
    }

    // Reset cooldown if it's passed
    if (state.cooldownUntil && now >= state.cooldownUntil) {
      setState({ attempts: 0, firstAttemptTime: null, cooldownUntil: null });
      return false;
    }

    // Check if window has passed and reset
    if (state.firstAttemptTime && now - state.firstAttemptTime > config.windowMs) {
      setState({ attempts: 0, firstAttemptTime: null, cooldownUntil: null });
      return false;
    }

    return state.attempts >= config.maxAttempts;
  }, [state, config.windowMs, config.maxAttempts]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();

    setState((prev) => {
      // If window has passed, reset
      if (prev.firstAttemptTime && now - prev.firstAttemptTime > config.windowMs) {
        return { attempts: 1, firstAttemptTime: now, cooldownUntil: null };
      }

      const newAttempts = prev.attempts + 1;
      const newFirstAttemptTime = prev.firstAttemptTime || now;

      // If max attempts reached, set cooldown
      if (newAttempts >= config.maxAttempts) {
        return {
          attempts: newAttempts,
          firstAttemptTime: newFirstAttemptTime,
          cooldownUntil: now + config.cooldownMs,
        };
      }

      return {
        attempts: newAttempts,
        firstAttemptTime: newFirstAttemptTime,
        cooldownUntil: null,
      };
    });
  }, [config.windowMs, config.maxAttempts, config.cooldownMs]);

  const getRemainingCooldown = useCallback(() => {
    if (!state.cooldownUntil) return 0;
    const remaining = state.cooldownUntil - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }, [state.cooldownUntil]);

  const getRemainingAttempts = useCallback(() => {
    return Math.max(0, config.maxAttempts - state.attempts);
  }, [config.maxAttempts, state.attempts]);

  const reset = useCallback(() => {
    setState({ attempts: 0, firstAttemptTime: null, cooldownUntil: null });
  }, []);

  return {
    isRateLimited,
    recordAttempt,
    getRemainingCooldown,
    getRemainingAttempts,
    reset,
  };
};
