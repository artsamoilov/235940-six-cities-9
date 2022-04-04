import {render, screen} from '@testing-library/react';
import CardPremiumMark from './card-premium-mark';

describe('Component: CardPremiumMark', () => {
  it('should render correctly', () => {

    render(<CardPremiumMark />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

