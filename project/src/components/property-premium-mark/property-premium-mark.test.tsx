import {render, screen} from '@testing-library/react';
import PropertyPremiumMark from './property-premium-mark';

describe('Component: PropertyPremiumMark', () => {
  it('should render correctly', () => {

    render(<PropertyPremiumMark />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
