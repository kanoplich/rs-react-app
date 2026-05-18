import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui';

interface TestErrorButtonProps {
  onError?: () => void;
}

export const TestErrorButton = ({ onError }: TestErrorButtonProps) => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    if (shouldThrowError) {
      throw new Error('Simulated error from test button');
    }
  }, [shouldThrowError]);

  const handleTriggerError = (): void => {
    setShouldThrowError(true);
    onError?.();
  };
  return (
    <div className="text-right">
      <Button className="mt-4" onClick={handleTriggerError}>
        Error Button
      </Button>
    </div>
  );
};
