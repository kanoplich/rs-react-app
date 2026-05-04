import { Button } from '@/shared/ui';
import { Component } from 'react';

interface TestErrorButtonProps {
  onError?: () => void;
}

interface TestErrorButtonState {
  shouldThrowError: boolean;
}

export class TestErrorButton extends Component<
  TestErrorButtonProps,
  TestErrorButtonState
> {
  constructor(props: TestErrorButtonProps) {
    super(props);
    this.state = {
      shouldThrowError: false,
    };
  }

  handleTriggerError = (): void => {
    this.setState({ shouldThrowError: true });
    this.props.onError?.();
  };

  componentDidUpdate(): void {
    if (this.state.shouldThrowError) {
      throw new Error('Simulated error from test button');
    }
  }

  render() {
    return (
      <div className="text-right">
        <Button className="mt-4" onClick={this.handleTriggerError}>
          Error Button
        </Button>
      </div>
    );
  }
}
