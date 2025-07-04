import { render, fireEvent } from '@testing-library/react-native';
import HTMLDescription from '@/components/HTMLDescription/HTMLDescription';
import {Linking} from "react-native";


describe('<HomeScreen />', () => {
  const sampleHTML = '<p>This is a <a href="https://example.com/">link</a>.</p>';
  const unsafeHTML = '<p>This is an unsafe <a href="javascript:alert(\'XSS\')">link</a>.</p>';

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HTMLDescription htmlContent={sampleHTML} />);

    expect(getByText('This is a link.')).toBeTruthy();
  });

  test('Safe links are opened using Linking.openURL', () => {
    const { getByText } = render(<HTMLDescription htmlContent={sampleHTML} />);
    fireEvent.press(getByText('link'));

    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com/');
  });

  test('Unsafe links are blocked and a warning is logged', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { getByText } = render(<HTMLDescription htmlContent={unsafeHTML} />);

    fireEvent.press(getByText('link'));

    expect(warnSpy).toHaveBeenCalledWith('Blocked unsafe link:', 'javascript:alert(\'XSS\')');
    expect(Linking.openURL).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
