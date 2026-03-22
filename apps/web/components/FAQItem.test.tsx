import { render, screen, fireEvent } from '@testing-library/react';
import { FAQItem } from './FAQItem';

const defaultProps = {
  id: 'pricing',
  question: 'How does the pricing intelligence work?',
  answer: 'Our AI analyzes market data to provide fair pricing insights.',
};

describe('FAQItem', () => {
  it('renders the question', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
  });

  it('does not show answer by default', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });

  it('shows answer after clicking the question', () => {
    render(<FAQItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
  });

  it('hides answer after clicking again (toggle)', () => {
    render(<FAQItem {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });

  it('shows "+" icon when closed', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('shows "−" icon when open', () => {
    render(<FAQItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('sets aria-expanded to false when closed', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when open', () => {
    render(<FAQItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('answer element has correct id for aria-controls', () => {
    render(<FAQItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(defaultProps.answer)).toHaveAttribute('id', 'faq-answer-pricing');
  });
});
