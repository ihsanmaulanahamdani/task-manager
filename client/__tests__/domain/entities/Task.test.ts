import {
  isValidTaskTitle,
  isValidTaskDescription,
  isValidTaskStatus,
} from '@/domain/entities/Task';

describe('Task Entity Business Rules', () => {
  describe('isValidTaskTitle', () => {
    it('should return true for valid titles', () => {
      expect(isValidTaskTitle('abc')).toBe(true);
      expect(isValidTaskTitle('Valid Task Title')).toBe(true);
      expect(isValidTaskTitle('a'.repeat(100))).toBe(true);
    });

    it('should return false for titles too short', () => {
      expect(isValidTaskTitle('')).toBe(false);
      expect(isValidTaskTitle('ab')).toBe(false);
      expect(isValidTaskTitle('  ')).toBe(false);
    });

    it('should return false for titles too long', () => {
      expect(isValidTaskTitle('a'.repeat(101))).toBe(false);
    });
  });

  describe('isValidTaskDescription', () => {
    it('should return true for valid descriptions', () => {
      expect(isValidTaskDescription('')).toBe(true);
      expect(isValidTaskDescription('Valid description')).toBe(true);
      expect(isValidTaskDescription('a'.repeat(500))).toBe(true);
    });

    it('should return false for descriptions too long', () => {
      expect(isValidTaskDescription('a'.repeat(501))).toBe(false);
    });
  });

  describe('isValidTaskStatus', () => {
    it('should return true for valid statuses', () => {
      expect(isValidTaskStatus('to_do')).toBe(true);
      expect(isValidTaskStatus('in_progress')).toBe(true);
      expect(isValidTaskStatus('done')).toBe(true);
    });

    it('should return false for invalid statuses', () => {
      expect(isValidTaskStatus('invalid')).toBe(false);
      expect(isValidTaskStatus('pending')).toBe(false);
      expect(isValidTaskStatus('')).toBe(false);
    });
  });
});
