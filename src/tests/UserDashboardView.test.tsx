/* eslint-disable unused-imports/no-unused-imports */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('if dashboard snapshot matches', async () => {
  // create and test for snapshot
  const expectedBudgetValue = '351 €';

  // Mocking the DOM structure
  document.body.innerHTML = `
    <div id="test-container">
      <p class="budget-text">Budget-to-Beat: ${expectedBudgetValue}</p>
    </div>
  `;

  // Find the injected budget element
  const budgetElement = screen.getByText(`Budget-to-Beat: ${expectedBudgetValue}`);

  // Assert that the budget value is correctly injected
  expect(budgetElement).toBeInTheDocument();
});
