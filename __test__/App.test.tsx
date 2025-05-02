import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, Button, View } from 'react-native';

describe('Basic React Native Component Tests', () => {
  it('renders a Text element with dynamic content', () => {
    const message = 'Dynamic Content';
    const { getByText } = render(<Text>{message}</Text>);
    expect(getByText('Dynamic Content')).toBeTruthy();
  });

  it('renders a Button and handles press events', () => {
    const mockPressHandler = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={mockPressHandler} />
    );

    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockPressHandler).toHaveBeenCalledTimes(1);
  });

  it('renders multiple components and verifies their presence', () => {
    const { getByText } = render(
      <View>
        <Text>First Component</Text>
        <Text>Second Component</Text>
      </View>
    );

    expect(getByText('First Component')).toBeTruthy();
    expect(getByText('Second Component')).toBeTruthy();
  });

  it('updates state and re-renders on interaction', () => {
    const TestComponent = () => {
      const [count, setCount] = React.useState(0);
      return (
        <View>
          <Text>Count: {count}</Text>
          <Button title="Increment" onPress={() => setCount(count + 1)} />
        </View>
      );
    };

    const { getByText } = render(<TestComponent />);
    const button = getByText('Increment');

    fireEvent.press(button);
    expect(getByText('Count: 1')).toBeTruthy();

    fireEvent.press(button);
    expect(getByText('Count: 2')).toBeTruthy();
  });
});